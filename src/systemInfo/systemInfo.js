
import os from 'os';

export const getCpus = () => {
  return os.cpus().map((cpu) => {
    return `Model: ${cpu.model}\nspeed: ${
      cpu.speed < 1000
        ? (cpu.speed / 10).toFixed(2) + " GHz"
        : (cpu.speed / 1000).toFixed(2) + " GHz"
    }`;
    }).join('\n') + `\ntotal cores (threads): ${os.cpus().length}`;
}

export const getSysUserName = () => os.userInfo().username;

export const getArchitecture = () => os.arch();

export const getHomeDir = () => os.homedir();

export const getEOL = () =>'EOL: ' + JSON.stringify(os.EOL);