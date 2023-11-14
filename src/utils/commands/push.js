import { runTerminalCommands } from "../../run_terminal.js";
export async function runPushCommands(targetFolder){
  runTerminalCommands([
  `kaggle kernels push -p ./${targetFolder}`]);
}