var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('hbs');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var mongo = require('mongodb');
var mongoose = require('mongoose');

//db connection
mongoose.connect('mongodb://localhost/forum');
var db = mongoose.connection;

var home = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');
var profile = require('./routes/profile');

var app = express();
exphbs.registerHelper('dateFormat', require('handlebars-dateformat'));

// view engine setup
app.set('views', path.join(__dirname, 'public', 'views'));
//app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'hbs');
exphbs.registerPartials(__dirname + '/public/views/partials');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
    secret: "it is anything",
    resave: false,
    saveUninitialized: false
}));
// Passport init

app.use(passport.initialize());
app.use(passport.session());

// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            err_msg: msg,
            value: value
        };
    }
}));

// Connect Flash
app.use(flash());


// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;

    next();
});

app.use('/', home);
app.use('/users', users);
app.use('/posts', posts);
app.use('/profile', profile);

// Set Port
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'), function () {
    console.log('Server started on port ' + app.get('port'));
});


//Handlebar Helper Function for comparision in view

exphbs.registerHelper('compare', function (lvalue, rvalue, options) {

    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    var operator = options.hash.operator || "==";

    var operators = {
        '==': function (l, r) {
            return l == r;
        },
        '===': function (l, r) {
            return l === r;
        },
        '!=': function (l, r) {
            return l !== r;
        },
        '<': function (l, r) {
            return l < r;
        },
        '>': function (l, r) {
            return l > r;
        },
        '<=': function (l, r) {
            return l <= r;
        },
        '>=': function (l, r) {
            return l >= r;
        },
        'typeof': function (l, r) {
            return typeof l == r;
        }
    };

    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);

    var result = operators[operator](lvalue, rvalue);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});
module.exports = app;
