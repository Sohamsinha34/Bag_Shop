const multer=require("multer");

const storage=multer.memoryStorage();
const upload= multer({storage:storage}); //-->store the files uploaded through multer in memory

module.exports=upload;