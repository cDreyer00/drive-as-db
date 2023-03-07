const { google } = require('googleapis');
const XLSX = require('xlsx');
require("dotenv").config();

const credentials = "./credentials.json";

const auth = new google.auth.GoogleAuth({
    keyFile: credentials,
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

function readFromDrive(fileId, sheetName) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await drive.files.export({ fileId, mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', alt: 'media' }, { responseType: 'arraybuffer' });
            const workBook = XLSX.read(response.data, { type: 'buffer' });
            const worksheet = workBook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    readFromDrive,
};