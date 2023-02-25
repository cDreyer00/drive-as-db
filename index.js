const app = require("express")();
const {read, readOnline} = require("./src/readXLSX.js");
const fetch = require("node-fetch");
const { json } = require("express");

app.use(json());

app.post("/file", async (req, res) => {
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

app.get("/url", async (req, res) => {
    const url = req.query.url;
    console.log(url);
    if(!url) return res.status(400).send("no url provided")

    const response = await fetch(url, {
        method: "GET",
        responseType: "arraybuffer"
    });
    
    const data = await response.arrayBuffer();
    
    try{
        let objData = await readOnline(data);
        return res.json(objData);
    }
    catch(e){
        return res.status(500).send(e.message);
    }
})

app.listen(3000, () => console.log("SERVER RUNNING AT http://localhost:3000"));