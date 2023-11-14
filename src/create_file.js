import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function downloadAndSaveFile(url) {
  try {
    const rootFolder = './';
    // Create a new target folder with a random name
    const targetFolder = path.join(rootFolder, uuidv4());
    fs.mkdirSync(targetFolder);

    // Download the file
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    
    // Extract file extension
    const urlParts = url.split('.');
    const fileExtension = urlParts[urlParts.length - 1];

    // Check if the file extension is .py or .ipynb
    if (fileExtension === 'py' || fileExtension === 'ipynb') {
      // Generate a new name for the file based on timestamp
      const timestamp = new Date().getTime();
      const filename = `file-${timestamp}`
      const newName = `${filename}.${fileExtension}`;

      // Save the file to the specified folder
      const filePath = path.join(targetFolder, newName);
      fs.writeFileSync(filePath, Buffer.from(response.data));
      console.log(`File downloaded and saved as ${newName} in ${targetFolder}`);
      return {targetFolder,fileExtension, filename}
    } else {
      console.log('File has an unsupported extension. Not saving.');
    }
  } catch (error) {
    console.error('Error downloading and saving file:', error.message);
  }
}

