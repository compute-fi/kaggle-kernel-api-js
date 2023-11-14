import fs from 'fs';
import path from 'path';


const rawData = fs.readFileSync('kaggle.json');
const jsonData = JSON.parse(rawData);
// Extract the username from kaggle.json
const username = jsonData.username;
export function generateMetadataFile( targetFolder, kernelSlug, extension, kernelType,enable_gpu,enable_tpu) {
  const metadata = {
    id: `${username}/${kernelSlug}`,
    title: `${kernelSlug}`,
    code_file: `${kernelSlug}.${extension}`,
    language: 'python',
    kernel_type: kernelType,
    is_private: 'true',
    enable_gpu: enable_gpu,
    enable_tpu: enable_tpu,
    enable_internet: 'true',
    dataset_sources: [],
    competition_sources: [],
    kernel_sources: [],
    model_sources: []
  };

  const jsonString = JSON.stringify(metadata, null, 2);
  const filePath = path.join(targetFolder, 'kernel-metadata.json');
  fs.writeFileSync(filePath, jsonString);

  console.log('kernel-metadata.json generated successfully!');
  return targetFolder
}
