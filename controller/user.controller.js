import { OTP } from "../models/otp.model.js";
import { User } from "../models/user.model.js"
import sendOtp from "../utils/sendOtp.js";
import TryCatch from "../utils/tryCatch.js";
import jwt from 'jsonwebtoken'



export const loginUser = TryCatch(async(req, res)=>{
    const {email} = req.body;
    const subject = "SCkart-Ecommerce App"
    const otp=Math.floor(Math.random()*1000000);
    const prevOtp = await OTP.findOne({
        email,
    })
    if(prevOtp){
        await prevOtp.deleteOne();
    }
    await sendOtp({email, subject, otp});
    await OTP.create({email, otp})
    res.json({
        message: "Otp sent to your mail"
    })
})



export const verifyUser = TryCatch(async(req, res)=>{
    const {email, otp} = req.body;
    const haveotp = await OTP.findOne({email, otp})
    if(!haveotp) return res.status(400).json({message: "Wrong OTP"})
     
    let user = await User.findOne({email})
    if(user){
        const token = jwt.sign({_id: user._id}, process.env.JWT_SEC, {
            expiresIn: "15d",
        });
        await haveotp.deleteOne();
        res.json({message: "User LoggedIn successfully.", token, user})
    }else{
        user = await User.create({
            email,
        })
        const token = jwt.sign({_id: user._id}, process.env.JWT_SEC, {
            expiresIn: "15d",
        });
        await haveotp.deleteOne();
        res.json({message: "User SignedUp successfully.", token, user})
    }
})



export const myProfile = TryCatch(async(req, res)=>{
    const user = await User.findById(req.user._id)
    res.json(user);
})