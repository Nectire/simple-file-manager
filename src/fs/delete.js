import { createReadStream, existsSync, rm } from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import { join } from "path";

import { InvalidInputError, OperationError } from "../errors.js";
import { getDir } from "../directoryPaths.js";

export const remove = async (pathToFile) => {
  try {
    console.log(pathToFile);
    if (!pathToFile) throw new InvalidInputError();

    const input = join(getDir(), pathToFile);

    if (!existsSync(input)) throw new OperationError();
    
    const stream = createReadStream(input);

    stream.on('data', () => {
      rm(input, (err) => {
        if (err) throw new OperationError();
        
        console.log('File deleted!');
      });
    })
  } catch (error) {
    console.error(error.message);
  }
};
