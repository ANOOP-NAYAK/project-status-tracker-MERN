const User = require('../models/userModel')

const userCtrl ={
    getUser : async (req,res) =>{
        try {
            const users = await User.find({user_id: req.user})
            res.json(users)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    createUser : async(req,res) =>{
        try {
            const {PSI, username, email} = req.body;
            
            const newUser = new User({
                PSI,
                username,
                email,
                user_id: req.admin.id,
                name : req.admin.name
            })
            await newUser.save()
            res.json({msg:"User added successfully...!!"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    deleteUser : async(req,res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted User"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    updateUser : async(req,res) =>{
        try {
            const {PSI, username, email} = req.body;
            await User.findOneAndUpdate({_id : req.params.id},{
                PSI,
                username,
                email
            })
            res.json({msg:"updated successfully...!!"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getUserbyid : async(req,res) => {
        try {
            const user = await User.findById(req.params.id)
            res.json(user)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = userCtrl