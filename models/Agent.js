const mongoose = require('mongoose');
const validator = require('validator').default;

const AgentSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required:true,
        validate: [validator.isEmail, "Invalid email"]
    },
    phone:{
        type: String,
        required: true,
        validate:[ validator.isMobilePhone ,"Invalid mobile number"]
    },
    photo: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: false
    },
    role: {
        type : String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }

})

module.exports = Agent = mongoose.model('agents',AgentSchema);