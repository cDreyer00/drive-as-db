require("dotenv").config();
const fs = require('fs');
const { google } = require('googleapis');

const FOLDER_ID = process.env.DRIVE_FOLDER_ID;
const GCAPI_KEY_PATH = process.env.GCAPI_KEY_PATH;

const auth = new google.auth.GoogleAuth({
    keyFile: GCAPI_KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/drive']
})

const drive = google.drive({
    version: "v3",
    auth
})

async function uploadFile(filePath, fileName, driveFolderID) {
    try {
        const metaData = {
            'name': fileName,
            'parents': driveFolderID
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

async function getDriveFile(fileId) {
    try {
        const driveFile = await drive.files.export({
            fileId: fileId,
            mimeType: 'application/vnd.google-apps.script+json',
        }, { responseType: 'stream' });

        const writeStream = fs.createWriteStream('./file.json');
        driveFile.data.pipe(writeStream);

        return new Promise((resolve, reject) => {
            writeStream.on('finish', () => {
                console.log('file created');
                resolve();
            });
            writeStream.on('error', (err) => {
                reject(err);
            });
        });
    } catch (err) {
        throw new Error(err);
    }
}

getDriveFile('1rKNlixwnWmV1g8v-KqWazWbfftOLzRVNyWkAZONrHRE')
    .then(() => console.log('done'))

module.exports = uploadFile;