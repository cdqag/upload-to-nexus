export enum LocalFileDoesNotExistReaction {
  fail = 'fail',
  warnIgnore = 'warn-and-ignore',
  silentIgnore = 'silent-ignore',
}

export const getLocalFileDoesNotExistReactionByValue = (value: string): LocalFileDoesNotExistReaction => {
  let key: keyof typeof LocalFileDoesNotExistReaction;
  for (key in LocalFileDoesNotExistReaction) {
      const _value = LocalFileDoesNotExistReaction[key];
      if (_value === value) {
          return LocalFileDoesNotExistReaction[key];
      }
  }

  throw new Error(`Invalid enum value: ${value}`);
}
