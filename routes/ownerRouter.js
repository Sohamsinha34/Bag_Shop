const express=require('express')
const router=express.Router();
const ownerModel=require('../models/owner');

if(process.env.NODE_ENV ==="development"){
    router.post("/create", async(req,res)=>{
        let owners=await ownerModel.find();
        if(owners.length>0){
            return res.status(503).send("you don't have permission to create a owner");
        }
        let{fullname,email,password}= req.body;
        
          let createdOwner= await ownerModel.create({
            fullname,
            email,
            password,
           })
        res.status(201).send(createdOwner)
    })
}

router.get("/admin",(req,res)=>{
    // req.flash("success", "Created!");
   let success=req.flash("success");
   res.render("createproduct",{ success });
})

 
module.exports=router;