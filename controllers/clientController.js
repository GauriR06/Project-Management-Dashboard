const Employee = require("../models/employee")


const loginService = (typedUsername, typedPassword, callback) => {
    
    //check if the user is in the DB
    Employee.find({emp_username:typedUsername}).then((result)=>{
        if(result[0].emp_password === typedPassword){
            console.log('pass');
            return callback(null, true, result);
        }
        else{
            console.log('fail');
            return callback(null, true, null);   
        }
    }).catch((err)=>{
        console.log(err)
        return callback(null, true, null);
    })
    
};

const loginControl = (req, res) => {
    
    let username = req.body.username;
    let password = req.body.password;
    
    console.log("-------------------------------- ");
    console.log(username);
    console.log(password);
    console.log("-------------------------------- ");

    if (!username || !password) {
        console.log("logIn fail")
        res.redirect("/login")
        res.end();
    } else {
        if (req.session && req.session.user) {
            console.log("Already signed in")
            res.end();
        } else {
            loginService(username, password, function(err, dberr, result) {
                if (result === null) {
                    res.redirect("/login")
                    console.log("Auhtentication problem!");
                    res.end();
                } else {
                    //add to session
                    req.session.user = username; 
                    res.redirect('/dashboard')
                }
            });
        }
    }
};


const logout = (req, res) => {
    res.render('login', {
        title: 'Login',
    })
    console.log("Signed out")
    req.session.destroy();
    res.end();

};
    
    
module.exports = {
    loginControl,
    loginService,
    logout
};