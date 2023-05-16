const express = require('express');
const session = require('express-session');
const { redirect } = require('express/lib/response');
var mysql = require('mysql2')
const lecturer_router = express.Router();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ruller"
});

lecturer_router.get('/create_rollcall/', function(req, res){
    var sql = 'select * from classes where ID_lecturer = ? and rollcall_created is not null'
    con.query(sql, [req,session.ID_lecturer], function(err, result){
        if (result.length > 0)
        {
            res.send('haha')
        }
        else
        {
            sql = 'select * from classes where ID_lecturer = ?'
            con.query(sql, [req.session.ID_lecturer], function(err, results){
                res.render('./lecturer-views/create-a-rollcall-content',{
                    results
                })
            })
        }
    })
})

lecturer_router.post('/handle_create_rollcall', function(req, res){
    var rollcall_created = new Date().getTime()
    var sql = 'update classes set rollcall_created = ? where ID_lecturer = ?'
    con.query(sql, [rollcall_created, req.session.ID_lecturer])

    sql = 'update rollcall set rollcall_created = ? where ID_class = ?'
    con.query(sql, [rollcall_created, id_class])

    setTimeout(function (){
        sql = 'update classes set rollcall_created = null where ID_lecturer = ?'
        con.query(sql, [req.session.ID_lecturer])
        sql = 'update rollcall set rollcall_created = null where ID_class = ?'
        con.query(sql, [req.body.id_class])
    }, 1000000)

    res.redirect('/create_rollcall')
})

module.exports = lecturer_router