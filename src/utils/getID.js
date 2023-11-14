import fs from 'fs/promises';
import path from 'path';

export async function getID(folderPath){
  const fileName = 'kernel-metadata.json';
  const filePath = path.join(folderPath, fileName);

  try {
    const data = await fs.readFile(filePath, 'utf8');
    const metadata = JSON.parse(data);
    const idValue = metadata.id;

    console.log(`ID value of ${fileName}: ${idValue}`);

    return idValue;
  } catch (error) {
    console.error(`Error reading or parsing file: ${error}`);
  }
};
