const mongoose = require("mongoose")
const Schema = mongoose.Schema
const proSchema = new Schema({
    task_name: {
        type: String,
        required: true
    },

    employee_name: {
        type: String,
        required: true
    },

    deadline_date: {
        type: String,
        required: true
    },


    //Completed OR Pending tasks
    status: {
        type: String,
        required: true
    }
    
}, {timestamps: true})

const Task = mongoose.model("Task", proSchema)
module.exports = Task