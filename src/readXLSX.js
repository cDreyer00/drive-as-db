XLSX = require('xlsx');

const read = (xlsxPath, columns) => new Promise((resolve, reject) => {
    try {
        //catch file
        const workBook = XLSX.readFile(xlsxPath);


        const titles = []
        const datas = []

        let loops = 0;
        for (var attr in workBook.Sheets.Plan1) {
            if (!workBook.Sheets.Plan1[attr].v) {
                loops++;
                continue;
            }

            if (loops < columns + 1) {
                titles.push(workBook.Sheets.Plan1[attr].v);
                loops++;
                continue;
            }

            datas.push(workBook.Sheets.Plan1[attr].v);

            loops++;
        }

        resolve(toJson(titles, datas, columns));
        //resolve({titles, datas});
    }
    catch (e) {
        reject(e);
    }

})

function toJson(titles, datas) {
    const data = {};
    for (let i in datas) {
        data[titles[i]] = datas[i];
    }
    return data;
}

function toJson(titles, datas, columns) {
    const newData = [];
    for (let i = 0; i < datas.length; i += columns) {
        const newObject = {};
        for (let j = 0; j < titles.length; j++) {
            newObject[titles[j]] = datas[i + j];
        }
        newData.push(newObject);
    }
    return newData;
}

function divideInSubArrays(arr, dataPerArr) {
    const subArr = [];
    for (let i = 1; i < arr.length; i += dataPerArr) {
        subArr.push(arr.slice(i, i + dataPerArr));
    }

    return subArr



}

module.exports = read;