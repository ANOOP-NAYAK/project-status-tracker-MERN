const Group = require('../models/groupModel')

const groupCtrl = {
    getGroup : async (req,res) =>{
        try {
            const groups = await Group.find({group_id: req.group})
            res.json(groups)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    createGroup : async(req,res) =>{
        try {
            const {groupname, users} = req.body;
            
            const newGroup = new Group({
                groupname,
                users,
                user_id: req.admin.id,
                name : req.admin.name
            })
            await newGroup.save()
            res.json({msg:"Group added successfully...!!"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    deleteGroup : async(req,res) => {
        try {
            await Group.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted Group"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    updateGroup : async(req,res) =>{
        try {
            const {groupname, users} = req.body;
            await Group.findOneAndUpdate({_id : req.params.id},{
                groupname,
                users
            })
            res.json({msg:"updated successfully...!!"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    getGroupbyid : async(req,res) => {
        try {
            const group = await Group.findById(req.params.id)
            res.json(group)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = groupCtrl