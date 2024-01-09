const express=require('express');
const fs=require('fs');
const app=express();
const path=require('path');

//for files in directories
app.get("/files",function(req,res){
   const dirPath = path.join(__dirname,'files');
   fs.readdir(dirPath, function(err,files){
    if(err){
        console.log("ERROR");
        res.status(500).json({error:"Error while opening the file "});
    }else{
        res.json({files})
    }
   })
});

//route for individual
app.get("/files/:fileName", function(req,res){
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname,"files",fileName);
    
    fs.access(filePath, fs.constants.F_OK, function(err) {
        if(err){
            console.log("Error");
            res.status(404).json({error: 'file not found'});
        }else{
            res.sendFile(filePath);
        }
    });
});

app.get("/",function(req,res){
    res.send("go to localhost:3000/files to access files");
})

app.listen(3000,function(){
    console.log("server running on port 3000")
});
