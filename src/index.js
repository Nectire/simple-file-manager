import { createInterface } from 'readline';
import { setDir, getDir } from './directoryPaths.js';
import { parseArg, parseCommand } from './utils.js';
import { ARGS } from './constants.js';
import { create } from "./fs/create.js";
import { list } from "./fs/list.js";
import { rename } from "./fs/rename.js";
import { remove } from "./fs/delete.js";
import { read } from "./fs/read.js";
import { compress } from './compression/compress.js';
import { decompress } from './compression/decompress.js';
import {
  getArchitecture,
  getCpus,
  getSysUserName,
  getHomeDir,
  getEOL,
} from "./systemInfo/systemInfo.js";
import { calculateHash } from './hash/calcHash.js';

const init = () => {
  const userName = parseArg(ARGS.userName)
    .replace(`${ARGS.userName}=`, '');

  setDir();

  function closeReadlineStream(readline) {
    process.stdout.write(`Thank you for using File Manager, ${userName}!\n`);
    readline.close();
  }

  const rl = createInterface(process.stdin, process.stdout);

  process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);
  process.stdout.write(`\nYou are currently in ${getDir()}\n`);

  rl.on('SIGINT', () => {
    closeReadlineStream(rl);
  });
  
  rl.on('line', async (data) => {
    const command = parseCommand(data);

    if (command === ".exit") {
      closeReadlineStream(rl);
    }

    if (command === "ls") {
      await list();
    }

    if (command === "up") {
      setDir("../");
    }

    if (command === "cd") {
      const parsedLine = data.split(" ");
      setDir(parsedLine[1]);
    }

    // fs
    if (command === "add") {
      const parsedLine = data.split(" ");
      await create(parsedLine[1]);
    }

    if (command === "cp") {
      const parsedLine = data.split(" ");
      await copy(parsedLine[1], parsedLine[2]);
    }

    if (command === "mv") {
      const parsedLine = data.split(" ");
      await move(parsedLine[1], parsedLine[2]);
    }

    if (command === "cat") {
      const parsedLine = data.split(" ");
      await read(parsedLine[1]);
    }

    if (command === "rm") {
      const parsedLine = data.split(" ");
      await remove(parsedLine[1]);
    }

    if (command == "rn") {
      const parsedLine = data.split(" ");
      await rename(parsedLine[1], parsedLine[2]);
    }

    if (command === "os") {
      if (data.includes(ARGS.cpus)) {
        process.stdout.write(`\n${getCpus()}\n`);
      }

      if (data.includes(ARGS.userName)) {
        process.stdout.write(`\n${getSysUserName()}\n`);
      }

      if (data.includes(ARGS.arch)) {
        process.stdout.write(`\n${getArchitecture()}\n`);
      }

      if (data.includes(ARGS.homeDir)) {
        process.stdout.write(`\n${getHomeDir()}\n`);
      }

      if (data.includes(ARGS.EOL)) {
        process.stdout.write(`\n${getEOL()}\n`);
      }
    }

    if (command === "hash") {
      const parsedLine = data.split(" ");
      calculateHash(parsedLine[1]);
    }

    if (command === "compress") {
      const parsedLine = data.split(" ");
      await compress(parsedLine[1], parsedLine[2]);
    }

    if (command === "decompress") {
      const parsedLine = data.split(" ");
      await decompress(parsedLine[1], parsedLine[2]);
    }

    process.stdout.write(`\nYou are currently in ${getDir()}\n`);
  });
}

init();
