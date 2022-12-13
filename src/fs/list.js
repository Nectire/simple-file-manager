import { getDir } from '../directoryPaths.js';
import { existsSync } from "fs";
import { readdir } from "fs/promises";

import { join } from "path";
import { OperationError } from '../errors.js';

export const list = async () => {
  
  try {
    const pathTofiles = join(getDir());

    if (!existsSync(pathTofiles)) throw new OperationError();

    const files = await readdir(pathTofiles)
      .catch(err =>{ throw new OperationError()});

    console.log(files);
  } catch (error) {
    console.error(error);
  }
};