const {createHmac,randomBytes}=require('crypto')

const { Schema ,model}=require('mongoose')
const{createToken,validToken}=require('../services/authentication')
const userSchema=new Schema({
    fullName:{
       type: String,
       require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    salt:{
        type:String,
        
    },
    password:{
        type:String,
        require:true,
        unique:true,
    },
    profileImageUrl:{
        type:String,
        default:"/images/default.png",
       

    },
    role:{
       type:String,
       enum:["USER","ADMIN"],
       default:"USER",
    },
},{timestamps:true})
userSchema.pre('save',function (next){
    const user=this
    if(!user.isModified('password')) return
    const salt=randomBytes(16).toString()
    const hashedpassword=createHmac("sha256",salt).update(user.password).digest("hex")


    this.salt=salt
    this.password=hashedpassword
    next()
})
userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
    const user=await this.findOne({email})
    if(!user) throw new Error('user not found!')

    const salt=user.salt
    const hashedpassword=user.password
    const userprovidedhash=createHmac('sha256',salt).
    update(password)
    .digest("hex")
    if(hashedpassword!==userprovidedhash) throw new Error("incorrect password")
    const token=createToken(user)
    return token
})

const user=model("user",userSchema)
module.exports=user