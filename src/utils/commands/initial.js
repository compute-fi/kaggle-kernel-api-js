import { runTerminalCommands } from "../../run_terminal.js";
const initialCommands = [
    'pip install kaggle',
    'mkdir ~/.kaggle',
    'cp kaggle.json ~/.kaggle/',
    'chmod 600 ~/.kaggle/kaggle.json'
  ];

export async function runInitialCommands(){
  runTerminalCommands(initialCommands);
}