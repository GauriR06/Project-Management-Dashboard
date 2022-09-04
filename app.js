const Task = require("./models/task")
const Employee = require("./models/employee")

const mongoose = require("mongoose")
const express = require("express")

const ClientController = require('./controllers/clientController');

const app = express()
app.use(express.urlencoded({extended: true}))

const db_uri = "mongodb+srv://corizo:test1234@cluster0-corizo.0yg0acl.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(db_uri).then(()=> {
    app.listen(3000)
    console.log("db connected")
    console.log(`DASHBOARD listening at http://localhost:3000`);

}).catch((err)=>{
    console.log(err)
})

app.use(express.static('public'));
app.set("view engine", "ejs")

app.use(express.json()); 

const session = require('express-session');
app.use(session({secret: 'some secret code', resave: false, saveUninitialized:true}));

//-----------------------------------------------------------------------------------------------


app.get("/", (req,res)=>{
    res.redirect('/login')
})

//Sign In
app.get('/login', (req,res)=>{
    res.render("login", {
        title: "Log In"
    })
})

//DASH
app.get('/dashboard', (req,res)=>{
    Employee.find().then((result_emp)=>{
        Task.find({status:"Completed"}).then((result_completed)=>{
            Task.find({status:"Pending"}).then((result_pending)=>{
            
                res.render("dashboard", {
                    title: "Dashboard",
                    completedTasks: result_completed,
                    pendingTasks: result_pending,
                    empResult: result_emp
                })
    
            }).catch((err)=>{
                console.log(err)
            })
            
        }).catch((err)=>{
            console.log(err)
        })

    }).catch((err)=>{
        console.log(err)
    })
    
})

// Changes Pending tasks to Completed
app.post('/updateTask', (req,res)=>{
    let task_id = {'_id':req.body.taskID}
    let setStatus = { $set: {status: "Completed"} };
    Task.updateOne(task_id, setStatus).then((result)=>{
        res.redirect('/dashboard') 
        console.log("Record status updated")
    }).catch((err)=>{
        console.log(err)
    })
})



//Sign In verification
app.post('/login', ClientController.loginControl)


//Sign Out
app.get('/signOut', ClientController.logout)

//Create task
app.get('/newTask', (req,res)=>{
    res.render("newTask", {
        title: "Create Task"
    })
})

//Add tasks
app.post('/createTask_success',(req,res)=>{
    const task = new Task({
        task_name: req.body.task_name,
        employee_name: req.body.empName,
        deadline_date: req.body.deadline,
        status: "Pending"
    })

    task.save().then((result)=>{
        res.redirect("/dashboard")
    }).catch((err)=>{
        console.log(err)
    })
})



//Add Products
// app.get("/add-prod", (req,res)=>{
//     const task = new Employee({
//         emp_Firstname: "Brian",
//         emp_Lastname: "Jones",
//         emp_designation: "Senior Software Engineer",
//         emp_username: "TeamLeader",
//         emp_password: "BJ555"
//     })

//     task.save().then((result)=>{
//         res.send(result)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

//404
app.use((req,res)=>{
    res.status(404).render("404", {
        title: "Error"
    })
})