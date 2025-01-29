import path from 'path';
import { jest, describe, test, expect } from '@jest/globals';

import { NexusRepositoryClient } from '../NexusRepositoryClient';

describe('NexusRepositoryClient', () => {
  describe('repositoryUrl', () => {
    test('should return correct repositoryUrl without leading slash in instanceUrl', () => {
      const client = new NexusRepositoryClient('http://localhost:8081', 'my-repo');
      expect(client.repositoryUrl).toBe('http://localhost:8081/repository/my-repo');
    });

    test('should return correct repositoryUrl with leading slash in instanceUrl', () => {
      const client = new NexusRepositoryClient('http://localhost:8081/', 'my-repo');
      expect(client.repositoryUrl).toBe('http://localhost:8081/repository/my-repo');
    });
  });

  describe('uploadFile', () => {
    test('should throw error if file does not exist', async () => {
      const client = new NexusRepositoryClient('http://localhost:8081', 'my-repo');

      await expect(client.uploadFile('/tmp/non-existent-file.txt', 'file.txt')).rejects.toThrow('File does not exist: /tmp/non-existent-file.txt');
    });

    test('should return 201', async () => {
      const client = new NexusRepositoryClient('http://localhost:8081', 'res-201');

      expect(await client.uploadFile(path.join(__dirname, '__fixtures__/file.txt'), 'file.txt')).toBe('OK');
    });

    test('should throw error if server responds with 401', async () => {
      const client = new NexusRepositoryClient('http://localhost:8081', 'res-401');

      await expect(client.uploadFile(path.join(__dirname, '__fixtures__/file.txt'), 'file.txt')).rejects.toThrow('Server responded with 401 - Unauthorized. Please check if the username and password are correct.');
    });

    test('should throw error if server responds with 404', async () => {
      const client = new NexusRepositoryClient('http://localhost:8081', 'res-404');

      await expect(client.uploadFile(path.join(__dirname, '__fixtures__/file.txt'), 'file.txt')).rejects.toThrow("Server responded with 404 - Not Found. Please check if the instance URL is correct and repository 'res-404' exists.");
    });

    test('should throw error if server responds with unknown error', async () => {
      const client = new NexusRepositoryClient('http://localhost:8081', 'res-418');

      await expect(client.uploadFile(path.join(__dirname, '__fixtures__/file.txt'), 'file.txt')).rejects.toThrow("Failed to upload file: [418] I'm a teapot");
    });
  });
});
