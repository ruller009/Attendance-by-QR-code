const express = require('express');
const qr = require('qrcode')
var mysql = require('mysql2')
const student_router = express.Router();


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ruller"
});

// Route for home page
student_router.get('/', function(req, res){
    res.redirect('/student/home_page')
})

student_router.get('/home_page', function(req, res){
    res.send('STUDENT HOME PAGE')
})

// ------------------------------------------------------

student_router.get('/notice', function(req, res){
    sql = 'select * from rollcall where ID_student = ? and rollcall_created is not null'
    con.query(sql, [req.session.ID_student], function(err, result){
        if (result.length == 0) res.send('Không có thông báo điểm danh');
        else
        {
            var rollcall_created = result[0].rollcall_created
            req.session.id_class = result[0].ID_class

            var url = 'http://localhost:3000/student/submit/' + req.session.id_class + '?' + rollcall_created
            console.log(url)

            qr.toDataURL(url, (err, src) => {
                res.render("qrcode", { src });
            });
        }
    })
})

student_router.get('/submit/:ID_class:time_created', function(req, res){
    res.render('student-views/student-submit-form')
})

student_router.post('/handle_submit', function(req, res){
    var sql = 'update rollcall set rollcall_created = null where ID_student = ? and ID_class = ?'
    con.query(sql, [req.session.ID_student, req.session.id_class])
    console.log(req.session.ID_student, req.session.id_class)
    delete req.session.id_class
    res.redirect('/student/notice')
})

student_router.get('/schedule',function(req, res){
    res.send('SCHEDULE')
})

student_router.get('/summary', function(req, res){
    res.send('SUMMARY')
})

module.exports = student_router