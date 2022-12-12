
import { COMMANDS } from "./constants.js";

export function parseArg(command) {
  return process.argv.slice(2)
    .find((arg) => arg.startsWith(command)) || "Username";
}

export function parseCommand(string) {
  return COMMANDS.find(command => {
    if (string.startsWith(command)) {
      return command;
    }
  });
}