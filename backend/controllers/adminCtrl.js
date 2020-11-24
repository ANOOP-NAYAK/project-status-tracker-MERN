const Admin = require('../models/adminModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminCtrl ={
    registerAdmin : async (req,res) => {
        try {
            const {username, email, password}=req.body;
            const admin = await Admin.findOne({email: email})
            if(admin) return res.status(400).json({msg:"Email already exists"})

            const passwordHash = await bcrypt.hash(password,10)
            const newAdmin = new Admin({
                username: username,
                email: email,
                password: passwordHash
            })
            await newAdmin.save()
            res.json({msg: "Sign up successful"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
        
    },

    loginAdmin :async(req,res) => {
        try {
            const {email,password} = req.body;
            const admin = await Admin.findOne({email:email})
            if(!admin) return res.status(400).json({msg:"Admin doesnt exixts"})
            
            const isMatch = await bcrypt.compare(password,admin.password)
            if(!isMatch) return res.status(400).json({msg:"Incorrect password."})

            //if login is successful create token
            const payload = {id:admin._id, name:admin.username}
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn:"1d"})
            res.json({token})
            //res.json({msg: "Login successful"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }     
    },

    verifiedToken: (req, res) => {
        try {
            const token = req.header("Authorization")
            if(!token) return res.send(false)

            jwt.verify(token, process.env.TOKEN_SECRET, async(err,verified) =>{
                if(err) return res.send(false)

                const admin = await Admin.findById(verified.id)
                if(!admin) return res.send(false)

                return res.send(true)
            })
        } catch (error) {
            return res.status(500).json({msg:err.msg})
        }
    }

}

module.exports = adminCtrl