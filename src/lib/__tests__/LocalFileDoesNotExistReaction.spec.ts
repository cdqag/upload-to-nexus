import { describe, test, expect } from '@jest/globals';

import {
  LocalFileDoesNotExistReaction,
  getLocalFileDoesNotExistReactionByValue
} from '../LocalFileDoesNotExistReaction';

describe('getLocalFileDoesNotExistReactionByValue', () => {
  test('should return fail', () => {
    expect(getLocalFileDoesNotExistReactionByValue('fail')).toBe(LocalFileDoesNotExistReaction.fail);
  });

  test('should return warn-and-ignore', () => {
    expect(getLocalFileDoesNotExistReactionByValue('warn-and-ignore')).toBe(LocalFileDoesNotExistReaction.warnIgnore);
  });

  test('should return silent-ignore', () => {
    expect(getLocalFileDoesNotExistReactionByValue('silent-ignore')).toBe(LocalFileDoesNotExistReaction.silentIgnore);
  });

  test('should throw error for invalid value', () => {
    expect(getLocalFileDoesNotExistReactionByValue.bind(globalThis, 'invalid')).toThrow('Invalid enum value: invalid');
  });
});
