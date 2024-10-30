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

        const tasks = readTaskFromFile();
        const newTask = {
            id: Date.now(),
            title: fields.title,
            description: fields.description,
            status: fields?.status || 'pending',
            image: files.image ? `/uploads/${files.image.name}` : null,
        };
        tasks.push(newTask);

        // Write the updated tasks list to file
        writeTasksToFile(tasks);

        // Check if the image file exists and has a path before trying to copy it
        if (files.image && files.image.path) {
            const destinationPath = path.join(__dirname, '../uploads', files.image.name);
            try {
                fs.copyFileSync(files.image.path, destinationPath);
            } catch (copyError) {
                console.error("Error copying file:", copyError);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error saving uploaded image' }));
                return;
            }
        }

        // Send the response with the new task
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTask));
    });
};

exports.updateTask = (req, res) => {
    res.end(JSON.stringify({ message: "not updated" }));
};

exports.deleteTask = (req, res) => {
    res.end(JSON.stringify({ message: "not deleted" }));
};
