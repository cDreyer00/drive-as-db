const app = require("express")();
const { readFromDrive } = require("./src/readXLSX.js");
const { json } = require("express");

app.use(json());

app.post("/", async (req, res) => {
    console.log("recieving request")

    const { sheetName, fileId } = req.body;

    reqLog(fileId, sheetName);

    if (!fileId || !sheetName) return res.status(400).send("file name and sheet name need to be informed")

    try {
        const data = await readFromDrive(fileId, sheetName);
        return res.json(data);
    }
    catch (e) {
        return res.status(400).send("file not found or with restrict access");
    }
})

function reqLog(fileId, sheetName) {
    const date = new Date();
    console.log(`============================================================`)
    console.log(`(${date.getHours()}:${date.getMinutes()})`)
    console.log(`file_id -> ${fileId}\nsheet_name -> ${sheetName}`)
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SERVER RUNNING AT http://localhost:${PORT}`));