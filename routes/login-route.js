const express = require('express');
var mysql = require('mysql2')
const login_router = express.Router();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ruller"
});

login_router.post('/handle_login', function(req, res){

    var username = req.body.username
    var psw = req.body.psw
    var career = req.body.career
    
    console.log(username,psw,career)
    if (username && psw && career)
    {   
        if (career == 'students')
        {
            var sql = 'select * from students where ID_student = ? and password = ?'
            con.query(sql, [username, psw], function(err, result){
                //console.log(result[0])
                req.session.ID_student = username
                req.session.career = 'student'
                //res.send(result[0].name)
                res.redirect('/student/home_page')
            })
        }
        else if (career == 'lecturers')
        {
            sql = 'select * from lecturers where ID_lecturer = ? and password = ?'
            con.query(sql, [username], function(err, result){
                req.session.ID_lecturer = username
                req.session.career = 'lecturer'
                
                res.redirect('/lecturer/home_page')
            })
        }
        else if (career == 'staffs'){
            sql = 'select * from staffs where ID_staff = ? and password =?'
            con.query(sql, [username], function(err, result){
                if(result.length() > 0)
                {
                    req.session.name = result.name
                    req.session.career = career

                    res.redirect('/staff/home_page')
                }
            })
        }
    }
    else
    {
        res.send('Hãy điền đầy đủ thông tin')
    }


    /*
    if (username == 'hailong' && psw == 'anhlaso1' && career == 'student'){
        res.send("Login successfully student")
    }
    
    else if(username == 'lecturer' && psw == 'anhlaso1' && career == 'lecturer'){
        res.send("Login successfully lecturer")
    }
    */
    
    /*
    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT * FROM students";
        con.query(sql, function(err, results) {
          if (err) throw err;
          console.log(results);
        })
    });
    */
    
})

login_router.get('/logout', function(req, res){
    req.session.destroy()
    res.redirect('/')
})

module.exports = login_router