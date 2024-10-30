const fs=require('fs');
const path=require('path');
const { json } = require("stream/consumers");
const filePath= './../data/tasks.json';

exports. writeTasksTOFile=(tasks)=>{
    fs.writeFileSync(filePath, JSON.stringify(tasks));
}
exports. readTaskFromFile=()=>{
if(!fs.existsSync(filePath)){
    writeTasksToFile([]);
}
const data=fs.readFileSync(filePath)

return JSON.parse(data); 





}