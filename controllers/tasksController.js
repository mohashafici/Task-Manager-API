const { IncomingForm } = require('formidable');
const fs = require('fs');  // Import fs module for file operations
const path = require('path');  // Import path module for path operations
const { readTaskFromFile, writeTasksToFile } = require("../utils/fileHandler");

exports.getTasks = (req, res) => {
    const tasks = readTaskFromFile();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
};


exports.createTask = (req, res) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error parsing form' }));
            return;
        }

      const image=  files.image[0];


        const tasks = readTaskFromFile();
        const newTask = {
            id: Date.now(),
            title: fields.title,
            description: fields.description,
            status: fields?.status || 'pending',
            image:image ? `/uploads/${image.originalFilename}` : null,
        };
        tasks.push(newTask);

        // Write the updated tasks list to file
        writeTasksToFile(tasks);

        if (files.image ) {
           fs.copyFileSync(image.filepath,path.join(__dirname,'../uploads',image.originalFilename));
           res.end(JSON.stringify(newTask));
        }

        // Send the response with the new task
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTask));
    });
};

exports.updateTask = (req, res) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error parsing form' }));
            return;
        }

        if (!fields.title) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Title is required' }));
            return;
        }

        const image = files.image ? files.image[0] : null;

        const tasks = readTaskFromFile();  // Corrected function call

        const taskId = parseInt(req.url.split('/').pop());
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (taskIndex === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Task not found' }));
            return;
        }

        const updatedTask = {
            ...tasks[taskIndex],
            title: fields.title || tasks[taskIndex].title,
            description: fields.description || tasks[taskIndex].description,
            status: fields.status || tasks[taskIndex].status,
            image: image ? `/uploads/${image.originalFilename}` : tasks[taskIndex].image,
        };

        tasks[taskIndex] = updatedTask;

        writeTasksToFile(tasks);

        if (image) {
            fs.copyFileSync(image.filepath, path.join(__dirname, '../uploads', image.originalFilename));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedTask));
    });
};


exports.deleteTask = (req, res) => {
    const tasks = readTaskFromFile();
    const taskId = parseInt(req.url.split('/').pop());
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        res.writeHead(404, { 'content-type': 'application/json'});
        res.end(JSON.stringify({
            message: 'Task not found'
        }))
        return;
    }

    const updatedTasks = tasks.filter(task => task.id !== taskId);
    writeTasksToFile(updatedTasks);
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({
        message: 'Task successfully deleted'
    }));
}