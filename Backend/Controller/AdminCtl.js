const logadmin=require('../Models/AdminLoginSchema');
const admin=require('../Models/AdminSchema');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const mailer = require("../Config/mailer")


module.exports.Registration=async(req,res)=>{
  try{
    const user = await logadmin.findOne({email: req.body.email})
    if(user){
      res.status(400).json({success: false, message: 'User already exis'}) 
    }
     req.body.password=await bcrypt.hash(req.body.password,10);
     req.body.confirmPassword=await bcrypt.hash(req.body.confirmPassword,10);

     if (await bcrypt.compare(req.body.password, req.body.confirmPassword)) {
          res.status(400).json({ msg: "Current password does not match" });
     }

     const registerdata=await logadmin.create(req.body);
      
     
     res.status(200).json({msg : "Create data Successfully...",registerdata});
  }
  catch(err){
    console.log(err);
    res.status(400).json({success: false, message: 'error found while register user', err})
    
  }
}

module.exports.loginadmin=async(req,res)=>{
  try{
    console.log(req.body)
   const user=await logadmin.findOne({email : req.body.email});
   console.log(user)
   if(user){
      if(await bcrypt.compare(req.body.password,user.password)){
         const token=jwt.sign({userdata : user},"node",{expiresIn : "1h"});
         res.status(200).json({msg : `Login Successfully`,token:token})
      }
      else {
        res.status(404).json({msg : "Wrong Password Please Try Again...!!"})

      }
   }
   else {
    res.status(404).json({msg : "Admin Not Found..."})
   }
  }
  catch {
   console.log("Login failed...");
   res.status(400).json({success: false, message: 'error found while login user', err})

  }
}

module.exports.insertadmin=async(req,res)=>{
  try {
    
    const insertdata=await admin.create(req.body)

     res.json(insertdata)
  }
  catch(err) {
    res.status(404).json(err)
  }
}

module.exports.viewAdmin=async(req,res)=>{
  try{
     const admindata=await admin.find({})
     res.json(admindata);

  }
  catch (err){
    console.log(err)
  }
}

module.exports.deleteadmin=async(req,res)=>{
  try {
    const deletedata=await admin.findByIdAndDelete(req.query.id);

    deletedata ? res.status(202).json({msg : "Admin Delete Successfully...",deletedata}) :
    res.status(404).json({msg : "Admin Not Deleted Try again...!!!"})
    
  }
  catch(err){
    res.status(404).json(err)
  }
}
module.exports.editdata=async(req,res)=>{
  try {
    const editdata = await admin.findById(req.query.id);
    editdata ? res.status(202).json({msg : "Admin get Successfully...",editdata}) :
    res.status(404).json({msg : "Admin Not edit Try again...!!!"})
  } catch (err) {
    res.status(400).json({success: false, message: 'error found while login user', err})

  }
}

module.exports.updatedata=async(req,res)=>{
  try{

    const updatee=await admin.findByIdAndUpdate(req.query.id,req.body);
    updatee ? res.status(202).json({msg : "Admin edit Successfully...",updatee}) :
    res.status(404).json({msg : "Admin Not update Try again...!!!"})

  }catch(err){
    res.status(404).json(err)
  }
}
module.exports.changepass = async (req, res) => {
  try {
    let user = await logadmin.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ msg: "Current password does not match" });
    }

    const newpassword = await bcrypt.hash(req.body.newpassword, 10);
    user.password = newpassword;
    await user.save();

    res.status(200).json({ msg: "Password changed successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error found while changing password', err });
  }
};
module.exports.forgetpass = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    let user = await logadmin.findOne({ email: req.body.email });
    console.log('User:', user);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    let otp = Math.floor(Math.random() * 100000 + 90000);
    const adminId = user.id;

    mailer.sendotp(req.body.email, otp);

    const cookieOptions = {
      maxAge: 10 * 60 * 1000,  // 10 minutes
      httpOnly: true,          // Prevents client-side access
      secure: process.env.NODE_ENV === 'production',  // Only set 'secure' in production
      sameSite: 'strict',      // Prevent CSRF attacks by limiting cross-site requests
    };
    
    res.cookie('otp', otp, cookieOptions);
    res.cookie('adminId', adminId, cookieOptions);
    
console.log(otp)
    console.log('Cookies after setting OTP:', req.cookies);
    res.status(200).json({ msg: "OTP sent to your email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occurred while processing the request" });
  }
};


module.exports.verifyOtp = async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Cookies:', req.cookies);

  try {
    const { otp, newpassword, confirmpassword } = req.body;
    let adminId = req.cookies.adminId;

    console.log('Admin ID from cookie:', adminId);
    console.log('OTP from cookie:', req.cookies.otp);

    if (req.cookies.otp === otp) {
      if (newpassword === confirmpassword) {
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        await logadmin.findByIdAndUpdate(adminId, { password: hashedPassword });
        res.clearCookie('otp');
        res.clearCookie('adminId');

        res.status(200).json({ msg: "Password updated successfully" });
      } else {
        return res.status(400).json({ msg: "New password and confirm password do not match" });
      }
    } else {
      return res.status(400).json({ msg: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error occurred while changing password", error });
  }
};
