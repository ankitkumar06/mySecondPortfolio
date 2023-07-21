const mongoose = require('mongoose')
const {Schema} = mongoose;

const contactManagerSchema = new Schema({
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    email : { 
        type : String,
    },
    project : {
        type : String,
    },
    
    userMessage : {
        type : String,
    },
    
    whenEntered: {
        type: Date,
        default: new Date(new Date().toISOString()),
    },
 
    isActive:{
        type: Boolean,
        default : true,
    }

}) 


module.exports = mongoose.model("SystemContactManager", contactManagerSchema,"SystemContactManager")