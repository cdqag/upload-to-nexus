import { describe, test, expect } from '@jest/globals';

import {
  processFilesInput,
  normalizeDestPath,
  getBasicAuthHeaderValue
} from '../utils';

describe('processFilesInput', () => {
  test('should fail when argument is not a string', () => {
    expect(processFilesInput.bind(globalThis, Infinity)).toThrow('Files input must be a string');
  });

  test('should fail when argument is an empty string', () => {
    expect(processFilesInput.bind(globalThis, '')).toThrow('Files input must not be empty');
  });

  test('should fail when destination is empty', () => {
    expect(processFilesInput.bind(globalThis, './file1.txt =>')).toThrow(`Destination for './file1.txt' cannot be empty`);
  });

  test('should remove leading "./" from destination', () => {
    const result = processFilesInput('./file1.txt => ./sub/file2.txt');
    expect(result[0].dest).toBe('sub/file2.txt');
  });

  test('should process single line', () => {
    const result = processFilesInput('./file1.txt => ./sub/file2.txt');
    expect(result).toEqual([
      {
        src: './file1.txt',
        dest: 'sub/file2.txt'
      }
    ]);
  });

  test('should process multiple lines', () => {
    const result = processFilesInput(`
./file1.txt
./sub/file2.txt => othername.txt`);
    expect(result).toEqual([
      {
        src: './file1.txt',
        dest: 'file1.txt'
      },
      {
        src: './sub/file2.txt',
        dest: 'othername.txt'
      }
    ]);
  });
});

describe('normalizeDestPath', () => {
  test('should remove leading "./"', () => {
    expect(normalizeDestPath('./sub/file2.txt')).toBe('sub/file2.txt');
  });

  test('should remove unnecessery "/"', () => {
    expect(normalizeDestPath('./sub//file2.txt')).toBe('sub/file2.txt');
    expect(normalizeDestPath('.//sub/file2.txt')).toBe('sub/file2.txt');
    expect(normalizeDestPath('.///sub///file2.txt')).toBe('sub/file2.txt');
    expect(normalizeDestPath('//sub/file2.txt')).toBe('sub/file2.txt');
  });

  test('should not do anything', () => {
    expect(normalizeDestPath('sub/file2.txt')).toBe('sub/file2.txt');
  });

  test('should leave relative path', () => {
    expect(normalizeDestPath('../sub/file2.txt')).toBe('../sub/file2.txt');
  });
});
