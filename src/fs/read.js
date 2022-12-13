import { existsSync, createReadStream} from "fs";
import { join } from "path";
import { InvalidInputError, OperationError } from "../errors.js";
import { getDir } from "../directoryPaths.js";

export const read = async (path) => {
  
  try {
    if (!path) throw new InvalidInputError();

    const readPath = join(getDir(), path);
    if (!existsSync(readPath)) {
      throw new OperationError();
    }
    const rs = createReadStream(readPath);
    rs.on('data', (data) => {
      console.log(data);
    });

    rs.on('error', (err) => {
      if (err) throw new OperationError();
    })

    } catch (error) {
      console.error(error.message);
    }
};