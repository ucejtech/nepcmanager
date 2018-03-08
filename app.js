let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let exphbs = require('express-handlebars');
let expressValidator = require('express-validator');
let flash = require('connect-flash');
let session = require('express-session');
let passport = require('passport');
let mongoose = require('mongoose');
let cookieSession = require('cookie-session')

const host = '0.0.0.0';
const port = process.env.PORT || 3000;


//Init app
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

// socket io
io.on('connection', function(socket){
 	console.log('a user connected');
 	socket.on('disconnect', function(){
    	console.log('user disconnected');
  });
 	socket.on('chat message', function(msg) {
 		io.emit('chat message', msg);
 		console.log(`Message : ${msg}`);

 	});
}); 

http.listen(port, host, () => {
	console.log(`listening on *:${port}`);
});

//db options
// let options = {
//     server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//     replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
//               };
              



MONGO_URI='mongodb://localhost/projectman';
MONGOLAB_URI='mongodb://fromMars:cod3f4lls@ds019068.mlab.com:19068/manager';

//db connection
mongoose.connect(MONGO_URI);

mongoose.connect(MONGOLAB_URI || MONGO_URI, function(error) {
  if(error) {
  	console.log('error: ', error);
  } else {
  	console.log('mongodb connection successful');
  	console.log(`Yay! look who's hosting us : ${db.collections.users.conn.host}`);
  	console.log(`I also connected to the remote db with the name: ${db.db.s.databaseName}`);
  	console.log()
  	
  }
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



// mongoose.connect(MONGOLAB_URI, function (error) {
//     if (error) console.error(error);
//     else console.log('mongo connected');
// });



//create routes
let routes = require('./routes/index');
let users = require('./routes/users');
let dashboard = require('./routes/dashboard');

//view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use(cookieParser());


// Set static folder

app.use(express.static(path.join(__dirname, 'public')));

// Express Session
// app.use(session({
// 	secret: 'cod3f4lls',
// 	saveUninitialized: true,
// 	resave: true
// }));

// replace express session with cookie session to handle memory leakage
app.use(cookieSession({
	name: 'session',
	keys: ['code', 'secret'],

	// cookie options
	maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;


		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));

// connect Flash middleware
app.use(flash());

// Global vars
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});


// set routes
app.use('/', routes);
app.use('/users',  users);
app.use('/dashboard', dashboard);
app.use(function (req, res, next) {
//   res.status(404).send("Sorry can't find that!")
  res.status(404).render('404');
});




// Set Port
app.set('port', (process.env.PORT || port));

// close server
function stop() {
  app.close();
}

// module.exports = app.listen(app.get('port'), () => {
// 	console.log('The magic happens on port ' + app.get('port'));
// });

module.exports.stop = stop;
