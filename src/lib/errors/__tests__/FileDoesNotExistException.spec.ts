import { describe, test, expect } from '@jest/globals';

import { FileDoesNotExistException } from '../FileDoesNotExistException';

describe('FileDoesNotExistException', () => {
  test('should return correct message', () => {
    expect(new FileDoesNotExistException('file.txt').message).toBe('File does not exist: file.txt');
  });
});
