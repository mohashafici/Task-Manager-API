const taskRoutes=(req,res) =>{
//TODO  define


if(req.method==='GET'){

    getTasks(req,res)

}

else if (req.method==='POST'){
    createTaasks(req,res)
}
else if (req.method==='PATCH'){
    updateTasks(req,res)
}
else if (req.method==='DELETE'){
    deleteTasks(req,res)
}

else {
    res.writeHead(404, 'Not Found', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Page not found' }));
}


}
module.exports=taskRoutes;