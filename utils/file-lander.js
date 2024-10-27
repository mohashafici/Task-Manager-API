const fs=require("fs");
const { json } = require("stream/consumers");


exports.writeTasksToFile=(data) =>{

    // fs.writeFile("tasks.json", JSON.stringify(data), (err) => {
    //     if (err) throw err;
    //     console.log("Tasks saved!");
    // });
    

    fs.writeFileSync("./../data/tasks.json", JSON.stringify(data));
    return data;


}
exports.readTaskFromFile=()=>{
    if(!fs.existsSync('./../data/tasks.json')){

        this.writeTasksToFile([]);
    }
   const data= fs.readFileSync('./../data/tasks.json')

   
}