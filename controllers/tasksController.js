
//exports ma aanan sameynin

const { readTaskFromFile, writeTasksTOFile } = require("../utils/fileHandler")

exports.getTask = (req,res)=>{
 const tasks=readTaskFromFile()
}

exports.createTask = (req,res)=>{
    const  tasks=writeTasksTOFile(req,res)

}
exports.updatedTask = (req,res)=>{}

exports.deleteTask = (req,res)=>{}