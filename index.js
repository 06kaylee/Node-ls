#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

//returns a promise
const {lstat} = fs.promises; 


//set to argument if provided. If not, then defaults to cwd
const targetDir = process.argv[2] || process.cwd(); 

fs.readdir(targetDir, async (err, filenames) => {
    if(err) {
        throw new Error(err);
    }
    
    const statPromises = filenames.map(filename => {
        //returns promises pending
        return lstat(path.join(targetDir, filename)); 
    });

    //waits until promises resolve and stores result in array
    const allStats = await Promise.all(statPromises); 

    //changes color based on whether it is a file or directory
    allStats.forEach((stats, idx) => {
        if(stats.isFile()){
            console.log(chalk.hex('#82d197')(filenames[idx]));
        }
        else {
            console.log(chalk.blue.bold(filenames[idx]));
        }
    });
});



//Initial Setup
//1. In the package.json file, add the key "bin" with a value of the name you want the executable to be called and the file that the executable runs.
//2. Add the shebang line at the top of index.js to let node know that you should execute this file instead of opening it. 
//3. Run the command 'npm intall -g' to install the file globally
//4. Run the command 'npm install chalk' to install chalk for changing colors