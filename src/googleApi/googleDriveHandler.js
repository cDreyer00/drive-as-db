require("dotenv").config();
const fs = require('fs');
const { google } = require('googleapis');

const apiKey = process.env.GOOGLE_API_KEY
const auth = google.auth.fromAPIKey(apiKey)
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

module.exports = {
    uploadFile,
    downloadFile
};