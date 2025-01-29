import { describe, test, expect } from '@jest/globals';

import { InvalidURLProtocolException } from '../InvalidURLProtocolException';

describe('InvalidURLProtocolException', () => {
  test('should return correct message', () => {
    expect(new InvalidURLProtocolException('abba:').message).toBe("Protocol 'abba:' is not supported. Only 'http:' and 'https:' are supported.");
  });
});
