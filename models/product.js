const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    image:Buffer,
    name:String,
    price:Number,
    discount:{
        type:Number,
        default:0,
    },
     sold: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    stock: { type: Number, default: 0 },
    bgcolor:String,
    panelcolor:String,
    textcolor:String,
})
module.exports=mongoose.model("product",productSchema);