const app = require("express")();
const { readFromDrive } = require("./src/readXLSX.js");
const { json } = require("express");

app.use(json());

app.get("/gdrive/xlsx", async (req, res) => {
    const { sheetName, fileName } = req.body;

    reqLog(fileName, sheetName);

    if(!fileName || !sheetName) return res.status(400).send("file name an sheet name need to be informed")

    try{
        const data = await readFromDrive(fileName, sheetName);
        return res.json(data);
    }
    catch(e){
        return res.status(500).send(e);
    }
})

function reqLog(fileName, sheetName) {
    const date = new Date();
    console.log(`============================================================`)
    console.log(`file required AT -> ${date.getHours()}:${date.getMinutes()}`)
    console.log(`NAME -> ${fileName}\nSHEET_NAME -> ${sheetName}`)
}

app.listen(3000, () => console.log("SERVER RUNNING AT http://localhost:3000"));