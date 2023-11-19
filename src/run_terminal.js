import {execSync} from 'child_process';
export function runTerminalCommands(commands) {
  let data = '';
  commands.forEach(command => {
    try {
      const result = execSync(command, { encoding: 'utf-8' });
      console.log("COMMAND EXECUTED", result)
      data = result;
    } catch (error) {
      console.error(`Error running command ${command}: ${error.message}`);
    }
  });
  return data;
}