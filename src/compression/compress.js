import { createReadStream, createWriteStream, existsSync } from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import { createBrotliCompress } from 'zlib';
import { join } from "path";

import { InvalidInputError, OperationError } from "../errors.js";
import { getDir } from "../directoryPaths.js";

export const compress = async (pathToFile, dest) => {
  try {
    if (!pathToFile || !dest) throw new InvalidInputError();

    const pipe = promisify(pipeline);
    const input = join(getDir(), pathToFile);
    const output = join(getDir(), dest);

    if (!existsSync(input)) throw new OperationError();

    await pipe(
      createReadStream(input),
      createBrotliCompress(),
      createWriteStream(output)
      );
  } catch (error) {
    console.error(error.message);
  }
}