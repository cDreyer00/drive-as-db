const app = require("express")();
const read = require("./src/readXLSX.js");


// app.get("/", async (req, res) => {
//     const data = await read("./files/DalyRewards.xlsx", 4);
//     res.json(data);
// })

// app.listen(3000, () => console.log("SERVER RUNNING AT http://localhost:3000"));

async function run() {
    const data = await read("./files/DalyRewards.xlsx", 4);
    console.log(data);
}
run()
