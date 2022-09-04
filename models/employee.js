const mongoose = require("mongoose")
const Schema = mongoose.Schema
const proSchema = new Schema({
    emp_Firstname: {
        type: String,
        required: true
    },

    emp_Lastname: {
        type: String,
        required: true
    },

    emp_designation: {
        type: String,
        required: true
    },

    emp_username: {
        type: String,
        required: true
    },

    emp_password: {
        type: String,
        required: true
    }
    
}, {timestamps: true})

const Employee = mongoose.model("Employee", proSchema)
module.exports = Employee