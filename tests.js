XLSX = require('xlsx');

const workBook = XLSX.readFile("./files/DalyRewards.xlsx");

//workBook.Strings.map((item) => console.log(item))

console.log("============= NEW DISPLAY =============");
let loops = 0;
for(var attr in workBook.Sheets.Plan1 ){
    if(loops == 0){
        loops++;
        continue;
    } 
    console.log(workBook.Sheets.Plan1[attr].v);
    loops++;
}