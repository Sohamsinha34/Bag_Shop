const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Stach');

const ownerSchema=mongoose.Schema({
     fullname:{
        type:String,
        minLength:3,
         trim:true 
        }
     ,
     email:String,
     password:String,
      isadmin:Boolean,
      products:{ 
        type:Array,
        default:[]
      },
    gstin:String,
    picture:String,
});

module.exports=mongoose.model("owner",ownerSchema);