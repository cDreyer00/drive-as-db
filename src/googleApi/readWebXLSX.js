const XLSX = require('xlsx');
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    "183599954613-3thpf98jdike0uolg2gqd2o7ob2tarvr.apps.googleusercontent.com",
    "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",
    "https://cdreyer.tech"
  );

const drive = google.drive({ version: 'v3', auth: "AIzaSyBoxE6FFuIMMxQ-4v_OjgtHwPK9GZuVxco"});

const read = (xlsxPath, columns) => new Promise((resolve, reject) => {
    drive.files.get({
        fileId: '1lDZ97g82qVzHZ95IGMSx8ltC1ZJo9OvV'
    },
    function (err, res) {
        if (err) reject(err);
        const workbook = XLSX.read(res.data, { type: 'buffer' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);

        resolve(data);
    });
})



module.exports = read;