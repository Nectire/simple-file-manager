import { createInterface } from 'readline';
import { setDir, getDir } from './directoryPaths.js';
import { parseArg, parseCommand } from './utils.js';
import { ARGS } from './constants.js';
import { compress } from '../../rss-nodejs-tasks/src/compression/compress.js';
import { decompress } from '../../rss-nodejs-tasks/src/compression/decompress.js';

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
