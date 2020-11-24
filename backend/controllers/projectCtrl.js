const Project = require('../models/projectModel')

const projectCtrl = {

    getProject : async (req,res) =>{
        try {
            const projects = await Project.find({project_id: req.project})
            res.json(projects)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    createProject : async(req,res) =>{
        try {
            const {projectname,projectdescription,client,members,assigneddate,ETAdate,progress} = req.body;
            
            const newProject = new Project({
                projectname,
                projectdescription,
                client,
                members,
                assigneddate,
                ETAdate,
                progress,
                user_id: req.admin.id,
                name : req.admin.name
            })
            await newProject.save()
            res.json({msg:"Project added successfully...!!"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    deleteProject : async(req,res) => {
        try {
            await Project.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted Project"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    updateProject : async(req,res) =>{
        try {
            const {projectname,projectdescription,client,members,assigneddate,ETAdate,progress} = req.body;
            await Project.findOneAndUpdate({_id : req.params.id},{
                projectname,
                projectdescription,
                client,
                members,
                assigneddate,
                ETAdate,
                progress
            })
            res.json({msg:"updated successfully...!!"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getProjectbyid : async(req,res) => {
        try {
            const project = await Project.findById(req.params.id)
            res.json(project)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = projectCtrl