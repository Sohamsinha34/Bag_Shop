const mongoose=require('mongoose');


const userSchema=mongoose.Schema({
     fullname:String,
     email:String,
     password:String,
     cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "product",
        product:mongoose.Schema.Types.ObjectId,
        quantity: { type: Number },
     }],
      
      orders:{
        type:Array,
        default:[]
      },
      contact:Number,
      profilepic:{
        type:String,
        default:"default.png"
    }
});

module.exports=mongoose.model("user",userSchema);