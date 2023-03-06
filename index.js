const app = require("express")();
const { readFromDrive } = require("./src/readXLSX.js");
const { json } = require("express");

app.use(json());

app.get("/gdrive/xlsx", async (req, res) => {
    const { sheetName, fileId } = req.body;

    reqLog(fileId, sheetName);

    if(!fileId || !sheetName) return res.status(400).send("file name an sheet name need to be informed")

    try{
        const data = await readFromDrive(fileId, sheetName);
        return res.json(data);
    }
    catch(e){
        return res.status(500).send(e);
    }
})

function reqLog(fileId, sheetName) {
    const date = new Date();
    console.log(`============================================================`)
    console.log(`(${date.getHours()}:${date.getMinutes()})`)
    console.log(`file_id -> ${fileId}\nsheet_name -> ${sheetName}`)
}

app.listen(3000, () => console.log("SERVER RUNNING AT http://localhost:3000"));