const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    groupname : {
        type: String,
        required: true
    },
    users : [{
        type:String,
        required : true
    }]
},{
    timestamps:true
})

module.exports = mongoose.model('Group',groupSchema)