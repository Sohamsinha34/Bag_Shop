const userModel=require('../models/user')
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const {tokengenerate}=require("../utils/tokengenerate")



module.exports.registerUser=async function (req,res){
        try{
        let{email,fullname,password}=req.body;
       
      let user= await userModel.findOne({email: email});
      if(user) return res.status(401).send("you already have an account")


        bcrypt.genSalt(10,(err,salt)=>{
         bcrypt.hash(password, salt,async(err,hash)=>{
            if(err) return res.send(err.message);
            else {
            let user=await userModel.create({
                email,
                password:hash,
                fullname
            });
           let token = tokengenerate(user);
            res.cookie("token",token);
            res.send("user created succesfully");
        }
         })
        })  
      }
        catch (err){
        res.send(err.message)
       }
} 

module.exports.loginUser =async function (req,res){
  let{email,password}=req.body

  let user= await userModel.findOne({email: email});
      if(!user) return res.status(401).send("Email and password incorrect");

      bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
          let token=tokengenerate(user);
          res.cookie("token",token);
          res.redirect("/shop")
        }
        else{
          return res.status(401).send("Email and password incorrect");
        }
      })
}
module.exports.logout=(req,res)=>{
  res.cookie("token","");
  res.redirect("/")
}