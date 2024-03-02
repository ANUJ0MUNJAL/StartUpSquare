const {z} =require("zod");

const signupSchema = z.object({
    name: z.string({required_error:"Name is Required"}).trim()
    .min(3,{message : "Name must at least of 3 Characters"})
    .max(255,{message : "Name must at most of 255 Characters"}),


    email: z.string({required_error:"Email is Required"}).trim()
    .email({message : "Invalid Email address"})
    .min(3,{message : "Email must at least of 3 Characters"})
    .max(255,{message : "Email must at most of 255 Characters"}),



    phone: z.string({required_error:"Phone is Required"}).trim()
    .min(10,{message : "Phone must at least of 10 Characters"})
    .max(20,{message : "Phone must at most of 20 Characters"}),



    role: z.string({required_error:"Role is Required"}).trim()
    .min(1,{message : "Role must at least of 1 Characters"})
    .max(255,{message : "Name must at most of 255 Characters"}),



    password: z.string({required_error:"Password is Required"}).trim()
    .min(7,{message : "Password must at least of 7 Characters"})
    .max(255,{message : "Password must at most of 255 Characters"}),
})

module.exports=signupSchema;