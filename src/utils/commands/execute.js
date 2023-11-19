import { runTerminalCommands } from "../../run_terminal.js";
export async function runExecuteCommands(targetFolder){
  runTerminalCommands([
    'pip install kaggle',
    'mkdir ~/.kaggle',
    'cp kaggle.json ~/.kaggle/',
    'chmod 600 ~/.kaggle/kaggle.json',
   `kaggle --version`, 
  `kaggle kernels init -p /${targetFolder}`]);
}