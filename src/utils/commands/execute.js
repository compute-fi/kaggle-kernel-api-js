import { runTerminalCommands } from "../../run_terminal.js";
export async function runExecuteCommands(targetFolder){
  runTerminalCommands([
  `kaggle kernels init -p ./${targetFolder}`]);
}