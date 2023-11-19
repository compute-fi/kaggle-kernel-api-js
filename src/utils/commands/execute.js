import { runTerminalCommands } from "../../run_terminal.js";
export async function runExecuteCommands(targetFolder){
  runTerminalCommands([
   `kaggle --version`, 
  `kaggle kernels init -p /${targetFolder}`]);
}