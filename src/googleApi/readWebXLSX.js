const XLSX = require('xlsx');
const { google } = require('googleapis');

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