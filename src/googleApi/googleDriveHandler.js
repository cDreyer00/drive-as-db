require("dotenv").config();
const fs = require('fs');
const { google } = require('googleapis');

const FOLDER_ID = process.env.DRIVE_FOLDER_ID;
const GCAPI_KEY_PATH = process.env.GCAPI_KEY_PATH;

const auth = new google.auth.GoogleAuth({
    keyFile: GCAPI_KEY_PATH,
    scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.readonly'
    ]
})

const drive = google.drive({
    version: "v3",
    auth
})

async function uploadFile(filePath, fileName, driveFolderID) {
    try {
        const metaData = {
            'name': fileName,
            'parents': [driveFolderID]
        }

        const file = {
            body: fs.createReadStream(filePath)
        }

        const response = await drive.files.create({
            resource: metaData,
            media: file
        })

        return response;
    }
    catch (err) {
        throw new Error(err);
    }
}

async function searchFile(fileName) {
    const searchQuery = `name='${fileName}' and trashed=false`;
    const { data } = await drive.files.list({
      q: searchQuery,
      fields: 'files(id, name)',
    });
    if (data.files.length === 0) {
      console.log('File not found.');
      return null;
    }
    return data.files[0];
  }
  
  async function downloadFile(fileName, downloadPath) {
      const file = await searchFile(fileName);
      if (!file) return;
  
      const fileId = file.id;
      const dest = fs.createWriteStream(downloadPath);
  
      drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' }, (err, res) => {
          if (err) {
              console.error(err);
              return;
          }
  
          res.data.pipe(dest);
      });
  }
  
  downloadFile('nf-marco.pdf', "./example.pdf")
      .then(() => console.log('File downloaded successfully.'));

/* uploadFile("./index.js", "aaa", "1VRBe85JlZmL2oOzaRSs_r9IaFFaU2z6D")
    .then(data => console.log(data))
    .catch(err => console.log(err))
 */
module.exports = {
    uploadFile,
    downloadFile
};