const mongoose = require('mongoose')
const { Schema } = mongoose;
const projectSchema = new mongoose.Schema({
    projectname :{
        type: String,
        required: true
    },
    projectdescription : {
        type : String,
    },
    client :{
        type: String,
    },
    members : [{
        type: String,
        required: true
    }],
    assigneddate : {
        type : Date,
        required: true
    },
    ETAdate: {
        type: Date,
        required: true
    },
    progress:{
        type: Number
    }
}, {
    timestamps: true
})

module.exports= mongoose.model('Project',projectSchema)