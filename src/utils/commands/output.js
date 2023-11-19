import { runTerminalCommands } from "../../run_terminal.js";
export async function runOutputCommands(id,targetFolder){
  return runTerminalCommands([
  `kaggle kernels output ${id} -p /${targetFolder}`]);
}