const app = require("express")();
const { read, readOnline } = require("./src/readXLSX.js");
const fetch = require("node-fetch");
const { json } = require("express");
const { downloadXLSX } = require("./src/googleApi/googleDriveHandler.js");

app.use(json());

app.post("/gdrive/xlsx", async (req, res) => {
    const { sheetName, fileName } = req.body;

    const date = new Date();
    console.log(`file required AT -> ${date.getHours()}:${date.getMinutes()}`)
    console.log(`NAME => ${fileName} | SHEET_NAME => ${sheetName}`)

    if(!fileName || !sheetName) return res.status(400).send("No filename provided")

    try{
        const data = await read(`./files/${fileName}.xlsx`, sheetName);
        return res.json(data);
    }
    catch(e){
        return res.status(500).send(e.message);
    }
})

// app.post("/gdrive/xlsx", async (req, res) => {
//     const { fileID, sheetName } = req.body;

//     reqLog(fileID, sheetName);
    
//     if (!fileID || !sheetName) return res.status(400).send("No filename provided")

//     try{

//     }
//     catch(e){
//         return res.status(500).send(e.message)
//     }
    
//     try {
//         const data = await read(`./files/${fileID}.xlsx`, sheetName);
//         return res.json(data);
//     }
//     catch (e) {
//         return res.status(500).send(e.message);
//     }
// })

function reqLog(fileID, sheetName) {
    const date = new Date();
    console.log(`============================================================`)
    console.log(`file required AT -> ${date.getHours()}:${date.getMinutes()}`)
    console.log(`NAME => ${fileID} | SHEET_NAME => ${sheetName}`)
}

app.listen(3000, () => console.log("SERVER RUNNING AT http://localhost:3000"));