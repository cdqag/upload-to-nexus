export class FileDoesNotExistException extends Error {
  constructor(fileName: string) {
    super(`File does not exist: ${fileName}`);
  }
}
