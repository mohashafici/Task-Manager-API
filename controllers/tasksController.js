const {IncomingForm}=require('formidable');
const { readTaskFromFile, writeTasksTOFile } = require("../utils/fileHandler")

exports.getTask = (req,res)=>{
 const tasks=readTaskFromFile()
 res.writeHead(200 ,{ 'Content-Type': 'application/json' });
 res.end(JSON.stringify(tasks));
}

// exports.createTask = (req,res)=>{
const form=new IncomingForm();
form.parse(req,(err,fields,files)=>{

    if(err){
        res.writeHead(400,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:'error parsing form'}));
        return;
    }
    const tasks=readTaskFromFile()
    const newTask={
        id:Date.now(),
        title:fields.title,
        description:fields.description,
        status:fields?.status ||  'pending',
        image:fields.image ?`/uploads/${fields.image.name}`:null,
    }
    tasks.push(newTask)

    writeTasksTOFile(tasks);


})
// }
exports.updatedTask = (req,res)=>{}

exports.deleteTask = (req,res)=>{}