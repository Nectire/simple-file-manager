import { createReadStream, createWriteStream, existsSync } from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import { createBrotliDecompress } from "zlib";
import { join } from "path";

import { InvalidInputError, OperationError } from "../errors.js";
import { getDir } from "../directoryPaths.js";

export const decompress = async (pathToFile, dest) => {
  try {
    if (!pathToFile || !dest) throw new InvalidInputError();

    const pipe = promisify(pipeline);
    const input = join(getDir(), pathToFile);
    const output = join(getDir(), dest);

    if (!existsSync(input)) throw new OperationError();

    await pipe(
      createReadStream(input),
    createBrotliDecompress(),
    createWriteStream(output)
    );
  } catch (error) {
    console.error(error.message);
  }
};
