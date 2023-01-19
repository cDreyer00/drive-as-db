const read = require("./src/readXLSX.js");

async function run(){
    const data = await read("./files/DalyRewards.xlsx", 4);
    console.log(data);

}
run()
