const express=require("express")
const path=require("path")
const app=express();
const userRoute=require("./routes/user")
const blogRoute=require("./routes/blog")
const mongoose=require("mongoose")
const Blog=require('./models/blog')
const cookiePaser=require("cookie-parser");
const { checkauthcookie } = require("./middlewares/authentication");
const port=8001;
mongoose.connect('mongodb://127.0.0.1:27017/blogify').
then(e=> console.log("connected"))
app.set("view engine","ejs")
app.set("views",path.resolve('./views'))
app.use(express.urlencoded({extended:false}))
app.use(cookiePaser())
app.use(checkauthcookie("token"))
app.use(express.static(path.resolve('./public')))
app.get('/',async(req,res)=>{
    const allBlogs=await Blog.find({})
    res.render('home',{
        user:req.user,
        blogs:allBlogs,
    })
})
app.use('/user',userRoute)
app.use('/blog',blogRoute)
app.listen(port,()=>{
    console.log(`serverrun at ${port}`)
})

