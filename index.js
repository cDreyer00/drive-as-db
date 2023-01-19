const app = require("express")();
const read = require("./src/readXLSX.js");

app.get("/:fileName", async (req, res) => {
    const fileName = req.params.fileName;
    
    if(!fileName) return res.status(400).send("No filename provided")

    try{
        const data = await read(`./files/${fileName}.xlsx`, 4);
        return res.json(data);
    }
    catch(e){
        return res.status(500).send(e.message);
    }
})

app.listen(3000, () => console.log("SERVER RUNNING AT http://localhost:3000"));