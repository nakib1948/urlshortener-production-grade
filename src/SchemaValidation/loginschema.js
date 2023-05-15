const Joi=require("joi")


const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(6).max(10).required()
})

module.exports={
    loginvalidation:async(req,res,next)=>{
        const check=await loginSchema.validate(req.body)
        if(check.error){
            res.json({
                success:0,
                message:check.error.details[0].message
            })
        }
        else next()
    }
}

