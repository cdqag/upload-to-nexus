import { URL } from 'node:url';
import { existsSync, createReadStream } from 'node:fs';

import * as core from '@actions/core';
import { HttpClient } from "@actions/http-client";
import { BasicCredentialHandler } from "@actions/http-client/lib/auth";

import { InvalidURLProtocolException } from './errors/InvalidURLProtocolException';
import { FileDoesNotExistException } from './errors/FileDoesNotExistException';
import { normalizeDestPath } from './utils';

const USER_AGENT = 'cdqag/upload-to-nexus'

export class NexusRepositoryClient {
  private instanceUrl: URL;
  private repository: string;
  private defaultDestination: string;
  
  private http: HttpClient;

  constructor(
    instanceUrl: string,
    repository: string,
    defaultDestination: string = '',
    username: string = '',
    password: string = ''
  ) {
    this.instanceUrl = new URL(instanceUrl);
    if (this.instanceUrl.protocol !== 'http:' && this.instanceUrl.protocol !== 'https:') {
      throw new InvalidURLProtocolException(this.instanceUrl.protocol);
    }

    this.repository = repository;
    this.defaultDestination = defaultDestination;

    const handlers = username !== '' ? [new BasicCredentialHandler(username, password)] : undefined
    this.http = new HttpClient(USER_AGENT, handlers);
  }

  get repositoryUrl(): string {
    return `${this.instanceUrl.href}repository/${this.repository}`;
  }

  async uploadFile(src: string, dest: string) {
    if (!existsSync(src)) {
      throw new FileDoesNotExistException(src);
    }
    
    const destPath = normalizeDestPath(`${this.defaultDestination}/${dest}`);

    core.info(`Uploading file '${src}' to '${destPath}'`);
    const response = await this.http.request('PUT', `${this.repositoryUrl}/${destPath}`, createReadStream(src));
    switch (response.message.statusCode) {
      case 201:
        return 'OK';

      case 401:
        throw new Error('Server responded with 401 - Unauthorized. Please check if the username and password are correct.');

      case 404:
        throw new Error(`Server responded with 404 - Not Found. Please check if the instance URL is correct and repository '${this.repository}' exists.`);

      default:
        throw new Error(`Failed to upload file: [${response.message.statusCode}] ${response.message.statusMessage}`);
    }
  }

}
