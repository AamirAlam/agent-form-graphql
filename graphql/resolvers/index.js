const forms = [];
const mongoose = require('mongoose');
const Form = require('../../models/Form');
const FormResponse = require('../../models/FormResponse');

module.exports = {
    forms: async () =>{
        var forms = await Form.find().lean();    
        return forms;
    },
    submitForm: async (args) =>{
        
        try {
            
            const form_response = {
                form_id: mongoose.Types.ObjectId(args.formInput.form_id),
                name: args.formInput.name,
                email: args.formInput.email,
                phone: args.formInput.phone,
                zip_code: +args.formInput.zip,
                photo: args.formInput.photo,
                document: args.formInput.document,
              }
              const saved_response = new FormResponse(form_response);
              await saved_response.save();
      
              return {success:true, message: "Your request has been sent!"};  
        } catch (error) {
            console.log(error.message)
            return {
                success: false,
                message: error.message
            }
        }  
    }
}