import express from 'express';
import path from 'path';
import { downloadAndSaveFile } from "./src/create_file.js";
import { generateMetadataFile } from "./src/create_metadata.js";
import { runExecuteCommands } from './src/utils/commands/execute.js';
import { runInitialCommands } from './src/utils/commands/initial.js';
import { runPushCommands } from './src/utils/commands/push.js';
import { getID } from './src/utils/getID.js';
import { runStatusCommands } from './src/utils/commands/status.js';
import { runOutputCommands } from './src/utils/commands/output.js';

const app = express();
const port = 3000;

app.get('/compute', async (req, res) => {
  // Extract query parameters
  const fileUrl = req.query.fileUrl;
  const enableGpu = req.query.enable_gpu.toString();
  const enableTpu = req.query.enable_tpu.toString();

  const {targetFolder,fileExtension, filename} =await downloadAndSaveFile(fileUrl);
  const kernel_type = (fileExtension === "py") ? "script" : (fileExtension === "ipynb") ? "notebook" : "unknown";
  await runExecuteCommands(targetFolder);
  const generatedfolder = await generateMetadataFile(targetFolder, filename, fileExtension, kernel_type, enableGpu, enableTpu)
  await runPushCommands(generatedfolder);
  //Wait for logs and store it to CID
  res.send(generatedfolder);
});

app.get('/status', async (req, res) => {
  const folderID = req.query.folderID;
  const ID = await getID(folderID);
  const result = await runStatusCommands(ID);
  res.send(result);
});
app.get('/output', async (req, res) => {
  const folderID = req.query.folderID;
  const ID = await getID(folderID);
  await runOutputCommands(ID,folderID);
  const title = ID.split('/')[1];
  const filePath = path.join(folderID, title+'.log');
  res.download(filePath, title+'.log', (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

// Start running the terminal commands
await runInitialCommands();

// Start the Express API
app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});


