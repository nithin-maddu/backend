const  User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.registerUser = async (req,res)=>{
  const  {name,email, password} = req.body;
  const exists = await User.findOne({email})
  if(exists) return res.send("user already registered")
  const hashed = await bcrypt.hash(password, 10)
   const user = await User.create({name,email, password: hashed})
    res.status(200).json({sucess:true, user})
}

exports.loginUser =  async (req,res)=>{
const {email, password} =  req.body;
const user = await User.findOne({email})
if(!user) return res.send("user not found")

    const match = await bcrypt.compare(password, user.password)
    if(!match) return res.send("pswrd doesnt match")

        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '1h'})
    
        res.json({message: "login done", token})

}