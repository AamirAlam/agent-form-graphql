const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required: false
    },
    posted_at:{
        type: Date,
        default : Date.now
    },
    fields: [
        {
            title:{
                type: String,
                required: false
            },
            name:{
                type : String,
                required: true
            },
            type:{
                type: String,
                required: true
            },
            required:{
                type : Boolean,
                required : true
            },
            placeholder:{
                type: String,
                required: false
            },
            value: {
                type :String,
                required: false
            }
        }
    ]
})

module.exports = Form = mongoose.model('forms',FormSchema);