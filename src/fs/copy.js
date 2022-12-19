import { createReadStream, existsSync, copyFile } from "fs";
import { join } from "path";

import { InvalidInputError, OperationError } from "../errors.js";
import { getDir } from "../directoryPaths.js";

export const copy = async (path, dest) => {
    try {
      if (!path || !dest) throw new InvalidInputError();

      const pathToFile = join(getDir(), path);
      const pathToFileCopy = join(getDir(), dest);

    if (!existsSync(pathToFile) || existsSync(pathToFileCopy))
      throw new OperationError();

      const rs = createReadStream(pathToFile);

      rs.on('data',(chunk) => {

        copyFile(pathToFile, pathToFileCopy, (err) => {
            if (err) throw new OperationError();
            console.log('File was copied!');
        })
      })

  } catch (error) {
    console.error(error.message);
  }

};
