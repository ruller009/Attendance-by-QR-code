var express = require("express");
var server = express();
var port = 3000;
var bodyParser = require("body-parser")
var session = require('express-session')
const loginRoute = require('./routes/login-route')
const lecturerRoute = require('./routes/lecturer-route')
const studentRoute = require('./routes/student-route')

server.set('views', './views')
server.set("view engine", "ejs");

server.use(bodyParser.urlencoded({ extended: false }));

server.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true
  })
);

server.use(express.static('public'))
server.use('/css', express.static(__dirname + 'public/css'))
server.use('/javascript', express.static(__dirname + 'public/javascript'))
server.use('/images', express.static(__dirname + 'public/images'))

server.use('/login', loginRoute)
server.use('/lecturer', lecturerRoute)
server.use('/student', studentRoute)

//
server.get('/', function(req, res){
    if (req.session.career)
    {
        if (req.session.career == 'student') res.redirect('/student/home_page');

        else if (req.session.career == 'lecturer') res.redirect('/lecturer/home_page');
        
        else if (req.session.career == 'staff') res.redirect('/staff/home_page');       
    } 
    else res.render('components/login-form');
})

server.get('/TestView', function(req,res){
    var now = 1000;
    res.render('./lecturer-views/rollcall-status',{
        now
    })
    /*
    res.render('./lecturer-views/rollcall-status',{
        now : JSON.stringify(now)
    })
    */
})
server.listen(port, function(){
    console.log("Server is listening on", port)
})
