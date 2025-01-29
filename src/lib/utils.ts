import * as core from '@actions/core';
import { type UploadDelegation } from './UploadDelegation';

/**
 * Process files input and output a list of files to upload.
 * 
 * Example:
 *   input:
 *     ./file1.txt
 *     ./sub/file2.txt => othername.txt
 * 
 *   output:
 *     [
 *       {
 *         "src": "./file1.txt",
 *         "dest": "file1.txt"
 *       },
 *       {
 *         "src": "./sub/file2.txt",
 *         "dest": "othername.txt"
 *      }
 *    ]
 * 
 * @param {*} filesInput 
 */
export const processFilesInput = (filesInput: String): UploadDelegation[] => {
  if (typeof filesInput !== 'string') {
    throw new Error('Files input must be a string');
  }

  filesInput = filesInput.trim();
  if (filesInput === '') {
    throw new Error('Files input must not be empty');
  }

  const lines = filesInput.split('\n');
  const delegations: UploadDelegation[] = [];

  for (let line of lines) {
    core.debug(`Processing line: ${line}`);
    line = line.trim();
    if (line === '') {
      continue;
    }

    const parts = line.split('=>').map(part => part.trim());

    let src = '';
    let dest = '';;

    if (parts.length === 1) {
      src = dest = parts[0];
    } else {
      src = parts[0];
      dest = parts[1];
    }

    if (dest === '') {
      throw new Error(`Destination for '${src}' cannot be empty`);
    }

    if (dest.startsWith('./')) {
      dest = dest.substring(2);
    }

    delegations.push({ src, dest });
  }

  return delegations;
}

/**
 * Require a non-empty string input.
 * @param name 
 * @returns 
 */
export const requireNonEmptyStringInput = (name: string): string => {
  const value = core.getInput(name).trim();
  if (value === '') {
    throw new Error(`Input '${name}' cannot be an empty string`);
  }
  return value;
}

/**
 * Normalize destination path.
 * @param dest 
 * @returns 
 */
export const normalizeDestPath = (dest: string): string => {
  dest = dest.replace(/\/{2,}/g, '/');
  if (dest.startsWith('./')) {
    dest = dest.substring(2);
  } else if (dest.startsWith('/')) {
    dest = dest.substring(1);
  }
  return dest;
}
