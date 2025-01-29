export class InvalidURLProtocolException extends Error {
  constructor(protocol: string) {
    super(`Protocol '${protocol}' is not supported. Only 'http:' and 'https:' are supported.`);
  }
}
