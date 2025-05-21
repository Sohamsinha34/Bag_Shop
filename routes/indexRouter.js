const express=require('express');
const router=express.Router();
const isLoggedin=require("../middlewares/isLoggend")
const productModel=require('../models/product')
const userModel=require('../models/user')
const upload=require('../middlewares/multer')

router.get("/",function(req,res){
    let error= req.flash("error");
    res.render("index",{error, loggedin:false})
});
 router.get("/shop",isLoggedin,async(req,res)=>{
     let products =await productModel.find().sort({ name: 1 })
    let success= req.flash("success");
     res.render("shop", { products, success})  
      
});
router.get("/cart", isLoggedin, async (req, res) => {
    try {
        let user = await userModel
            .findOne({ email: req.user.email })
            .populate("cart");
        let bill = 0;
        for (let item of user.cart) {
            bill += Number(item.price) + 20 - Number(item.discount);
        }
        res.render("cart", { user, bill });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
router.get('/shop/new', async (req, res) => {
     let products =await productModel.find().sort({ createdAt: -1 });
    let success= req.flash("success");
    res.render("shop",{products,success});
});
router.get('/shop/discounted', async (req, res) => {
     let products =await productModel.find().sort({ discount: -1 });
    let success= req.flash("success");
    res.render("shop",{products,success});
});

router.get("/addtocart/:productid",isLoggedin,async(req,res)=>{
    let user= await userModel.findOne({email: req.user.email})
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop")
});
router.get('/shop/available', isLoggedin, async (req, res) => {
    try {
        let products = await productModel.find({ stock: { $gt: 0 } });

        let success = req.flash("success");
        res.render("shop", { products, success });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Server error");
    }
});
router.post('/mentor', upload.single('profilepic'), (req, res) => {
  const { fullname, email, contact } = req.body;
  const profilepic = req.file ? req.file.filename : 'default.png';
   const user = {
    fullname,
    email,
    contact,
    profilepic
  };
   req.session.user = user
  res.render('display-profile', { user });
});
router.get("/display-profile",isLoggedin,async(req,res)=>{
     const user = req.session.user;

  if (!user) {
    return res.redirect('/profile'); 
  }

  res.render("display-profile", { user });
})

router.get("/profile",isLoggedin,async(req,res)=>{
    res.render("profile")
});

router.get("/logout",isLoggedin,async(req,res)=>{
    res.render("shop")
});
module.exports = router;