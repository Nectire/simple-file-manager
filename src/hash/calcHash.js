import { createReadStream, existsSync } from "fs";
import { createHash } from "crypto";
import { join } from "path";

import { InvalidInputError, OperationError } from "../errors.js";
import { getDir } from "../directoryPaths.js";

export const calculateHash = (path) => {
  try {
    if (!path) throw new InvalidInputError();
    const input = join(getDir(), path);
    if (!existsSync(input)) throw new OperationError();

    const hash = createHash("sha256");
    const readStream = createReadStream(input);

    readStream.on("readable", () => {
      const data = readStream.read();
      if (data) hash.update(data);
      else {
        console.log(`\n${hash.digest("hex")}\n`);
      }
    });
    readStream.on("error", (err) => {
      if (err) throw new OperationError();
    });
  } catch (error) {
    console.error(error.message);
  }
};

calculateHash();
