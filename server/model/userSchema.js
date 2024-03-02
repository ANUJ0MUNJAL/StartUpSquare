const mongoose=require('mongoose');
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
       name: {
         type: String,
         required: true
       },
       email :{
        type: String,
         required: true
       },
       phone:{
        type:Number,
        required: true
       },
       role:{
        type:String,
        required: true
       },
       password:{
        type:String,
        required: true
       },
      
       isadmin:{
        type:Boolean,
        default:false
       }
});


userSchema.pre("save",async function(next){

   const user = this;

   if(!user.isModified("password")){
    next();
   }
   
   try {
     const saltRound = await bcrypt.genSalt(10);
     const hash_password = await bcrypt.hash(user.password,saltRound);
     user.password=hash_password;

   } catch (error) {
    next(error);
   }



});


userSchema.methods.generateToken = async function() {
    try {
           return jwt.sign({
                  userId: this._id.toString(),
                  email:this.email,
                  isadmin: this.isadmin,
           },
           process.env.JWT_SECRET_KEY,{
            expiresIn: "30d",
           }
           );
       
    } catch (error) {
      console.error(error);
    }
};

const User = new mongoose.model("User",userSchema);
module.exports=User;