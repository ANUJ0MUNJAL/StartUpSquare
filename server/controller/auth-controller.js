const User=require("../model/userSchema");
const bcrypt=require("bcryptjs");

const home =async (req,res)=>{
    try {
        res.status(200).send("Hello mein project bana raha hoon");
    } catch (error) {
        console.log(error);
    }
}




const register=async(req,res)=>{
    try {

          const {name,email,phone,role,password} =req.body;

          const userExist= await User.findOne({email:email});
          console.log("data pahuncha yaahann");
          if(userExist){
            
            return res.status(400).json({message:"User already exist"});
          }
          

          

         console.log(req.body);
          const userCreated=await User.create({name,email,phone,role,password});

      



   

        res.status(201).json({
            message:"registeration successfull",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        })
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}



const login=async(req,res)=>{
    try {
        //    console.log(req.body);
        const {email,password}=req.body;
        const userExist = await User.findOne({email:email});

        if(!userExist){
            
            return res.status(400).json({message : "Invalid Credentials "});
        }

        const user =await bcrypt.compare(password , userExist.password);
        // console.log(req.body);
        if(user){
            res.status(200).json({
                message:"Login successfull",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
                role: userExist.role,
            })
        }else{
            res.status(401).json({message : "Invalid Email of Password"});
        }

        
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}
module.exports={home,register,login};