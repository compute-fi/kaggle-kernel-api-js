import { runTerminalCommands } from "../../run_terminal.js";
export async function runStatusCommands(id){
  return runTerminalCommands([
  `kaggle kernels status ${id}`]);
}