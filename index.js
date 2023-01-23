const app = require("express")();
const {read, readOnline} = require("./src/readXLSX.js");
const fetch = require("node-fetch");

app.get("/file/:fileName", async (req, res) => {
    const fileName = req.params.fileName;
    
    if(!fileName) return res.status(400).send("No filename provided")

    try{
        const data = await read(`./files/${fileName}.xlsx`);
        return res.json(data);
    }
    catch(e){
        return res.status(500).send(e.message);
    }
})

app.get("/url", async (req, res) => {
    const url = req.query.url;

    if(!url) return res.status(400).send("no url provided")

    const response = await fetch(url, {
        method: "GET",
        responseType: "arraybuffer"
    });
    
    const data = await response.arrayBuffer();
    
    // if(!fileName) return res.status(400).send("No filename provided")
    
    try{
        const objData = await readOnline(data);
        return res.json(objData);
    }
    catch(e){
        return res.status(500).send(e.message);
    }
})

app.listen(3000, () => console.log("SERVER RUNNING AT http://localhost:3000"));