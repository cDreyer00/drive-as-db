XLSX = require('xlsx');

async function read(xlsxPath, sheetName) {
    return await new Promise((resolve, reject) => {
        try {
            //catch file
            const workBook = XLSX.readFile(xlsxPath);
            const worksheet = workBook.Sheets[sheetName];
            
            const data = XLSX.utils.sheet_to_json(worksheet)
            resolve(data);
        }
        catch (e) {
            reject(e);
        }
    })
}

async function readOnline(data) {
    return await new Promise((resolve, reject) => {
        try {
            //catch file
            const workBook = XLSX.read(data);
            const worksheet = workBook.Sheets[workBook.SheetNames[0]];
            const res = XLSX.utils.sheet_to_json(worksheet)

            res.forEach(row => {
                delete row.__EMPTY;
            });

            let converted = convertObject(res)
            resolve(converted);
        }
        catch (e) {
            reject(e);
        }
    })
}

function convertObject(inputArray) {
    // Get the keys from the first object
    const keys = Object.keys(inputArray[0]);

    // Initialize an empty array for the output
    const outputArray = [];

    // Iterate over the input array
    for (let i = 1; i < inputArray.length; i++) {
        // Initialize an empty object for the current output
        const outputObject = {};

        // Iterate over the keys
        for (let j = 0; j < keys.length; j++) {
            // Get the key and value for the current object
            const key = keys[j];
            const value = inputArray[i][key];

            // If the value is not empty, add it to the output object
            if (value) {
                outputObject[inputArray[0][key]] = value;
            }
        }

        // If the output object is not empty, add it to the output array
        if (Object.keys(outputObject).length > 0) {
            outputArray.push(outputObject);
        }
    }

    return outputArray;
}

// const fetch = require("node-fetch");
// async function runTest(url) {
//     // const response = await fetch(url, {
//     //     method: "GET",
//     //     responseType: "arraybuffer"
//     // });

//     // const data = await response.arrayBuffer();
//     let path = './files/SilverChest.xlsx'
//     let res = await readTest(path, "PlatinumChest")
//     console.log(res);
// }

// runTest("https://docs.google.com/spreadsheets/d/1fKx8avg2JKEipgTIpLR9UNsidefshmCUIo0MfdS818s/edit?usp=share_link");


module.exports = {
    read,
    readOnline
};