import { writeFile, existsSync, createWriteStream } from "fs";
import { dirname, join } from "path";
import { InvalidInputError, OperationError } from "../errors.js";
import { getDir } from "../directoryPaths.js";

export const create = async (path) => {
  try {
    if(!path) throw new InvalidInputError();

    const filePath = join(getDir(), path);

    if (existsSync(filePath)) throw new OperationError();

    const wr = createWriteStream(filePath);
    wr.on('error', (err) => {
      if (err) throw new OperationError();
    });

    wr.on('finish', () => {
      console.log('File was written!');
    });
  } catch (error) {
    console.error(error.message);
  }
};
