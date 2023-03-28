const { google } = require('googleapis');
const XLSX = require('xlsx');
require("dotenv").config();

const apiKey = process.env.GOOGLE_API_KEY
const auth = google.auth.fromAPIKey(apiKey)
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