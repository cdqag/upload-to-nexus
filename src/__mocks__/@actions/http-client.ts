const mockedServerResponse: Record<string, CallableFunction> = {
    '/repository/res-201/file.txt': () => {
        return {
            message: {
                statusCode: 201,
            }
        };
    },

    '/repository/res-401/file.txt': () => {
        return {
            message: {
                statusCode: 401,
            }
        };
    },

    '/repository/res-404/file.txt': () => {
        return {
            message: {
                statusCode: 404,
            }
        };
    },

    '/repository/res-418/file.txt': () => {
        return {
            message: {
                statusCode: 418,
                statusMessage: "I'm a teapot"
            }
        };
    },
};

class HttpClient {
    request = jest.fn(async (method: string, url: string, data: NodeJS.ReadStream) => {
        const parsedUrl = new URL(url);
        if (mockedServerResponse[parsedUrl.pathname] === undefined) {
            return {
              message: {
                statusCode: 0,
                statusMessage: `No handler for ${parsedUrl.pathname}`
              }
            }
        }

        const handler = mockedServerResponse[parsedUrl.pathname];
        return handler();
    });
}

export { HttpClient };
