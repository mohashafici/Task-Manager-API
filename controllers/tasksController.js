
//exports ma aanan sameynin

const { readTaskFromFile } = require("../utils/fileHandler")

exports.getTask = (req,res)=>{
 const tasks=readTaskFromFile()
}

exports.createTask = (req,res)=>{
    
}
exports.updatedTask = (req,res)=>{}

exports.deleteTask = (req,res)=>{}