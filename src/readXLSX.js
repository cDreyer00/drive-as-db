XLSX = require('xlsx');

const read = (xlsxPath, columns) => new Promise((resolve, reject) => {
    try {
        //catch file
        const workBook = XLSX.readFile(xlsxPath);
        const worksheet = workBook.Sheets[workBook.SheetNames[0]];
        
        const data = XLSX.utils.sheet_to_json(worksheet)
        resolve (data);
    }
    catch (e) {
        reject(e);
    }
})

module.exports = read;