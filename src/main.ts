import * as core from '@actions/core';
import { processFilesInput, requireNonEmptyStringInput } from './lib/utils';
import { LocalFileDoesNotExistReaction, getLocalFileDoesNotExistReactionByValue } from './lib/LocalFileDoesNotExistReaction';

//#region Inputs

// --- Instance URL
const instanceUrl = requireNonEmptyStringInput('instance-url');

// --- Repository
const repository = requireNonEmptyStringInput('repository');
{
  const VALIDATION_REGEX = /^[a-z0-9~._+-]+$/;
  if (!VALIDATION_REGEX.test(repository)) {
    core.setFailed(`Invalid repository name: ${repository}`);
  }
}

// --- Files
const filesInput = requireNonEmptyStringInput('files');
const delegations = processFilesInput(filesInput);

// --- Default destination
const defaultDestination = core.getInput('default-destination').trim();

// --- Credentials
const username = core.getInput('username').trim();
const password = core.getInput('password');

// --- Local file does not exist reaction
let localFileDoesNotExistReaction: LocalFileDoesNotExistReaction;
try {
  localFileDoesNotExistReaction = getLocalFileDoesNotExistReactionByValue(core.getInput('if-local-file-does-not-exist'));
} catch (error) {
  const allowedValues = Object.values(LocalFileDoesNotExistReaction);
  core.setFailed(`Invalid value for if-local-file-does-not-exist. Allowed values are: ${allowedValues.join(', ')}`);
}

//#endregion
