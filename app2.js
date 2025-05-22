const express=require("express");
const app=express();
const cookieparser=require("cookie-parser");
const path=require("path");
const ownerRouter=require("./routes/ownerRouter");
const userRouter=require("./routes/userRouter");
const productRouter=require("./routes/productRouter");
const indexRouter=require("./routes/indexRouter");
const cartRouter=require("./routes/cartRouter");
const expressSession=require("express-session");
const flash=require("connect-flash");
require("dotenv").config();

const db=require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(
    expressSession({
        resave:false,
        saveUninitialized: false,
        secret: process.env.JWT_KEY
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set('views', './views');
app.use('/uploads', express.static('uploads'));
app.use("/",indexRouter);
app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);



app.listen(3004);

