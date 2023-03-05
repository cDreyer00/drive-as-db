const { google } = require('googleapis');
const XLSX = require('xlsx');
require("dotenv").config();

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


async function readFromDrive(fileName, sheetName) {
    return await new Promise((resolve, reject) => {
        drive.files.list({ q: `name='${fileName}'`, fields: 'files(id)' }, async (err, res) => {
            if (err) return reject(err);
            if (res.data.files.length === 0) return reject(`File '${fileName}' not found on Drive.`);
            
            const fileId = res.data.files[0].id;
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
    });
}

module.exports = {
    readFromDrive,
};
