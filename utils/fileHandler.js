const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/tasks.json');

// Write tasks to file
exports.writeTasksToFile = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks,null, 2));   
};

exports.readTaskFromFile = () => {
    if (!fs.existsSync(filePath)) {
        this.writeTasksToFile([]);  
    }
    const data = fs.readFileSync(filePath);

    return JSON.parse(data);
};
