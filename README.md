# kaggle-kernel-api-js (Quickstart)

1. Get your kaggle.json API from kaggle.com and place it in your root directory. Make sure it is verified.

2. `npm install`

3. `npm start`

4. Open your browser and use the URL `localhost:3000/compute?fileUrl=fileURL&enable_gpu=true&enable_tpu=false` to compute. Replace fileURL with your python script or notebook URL

5. To check the status of the compute `localhost:3000/status?folderID=folderID` , replace folderID with the one you received from 4.

6. To download your logs once status is complete `localhost:3000/output?folderID=folderID`.

