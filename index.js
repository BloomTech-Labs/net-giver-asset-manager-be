const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const authenticate = require("./api/auth/auth-middleware");
const authRouter = require("./api/auth/auth-router.js");
const assetsRouter = require("./api/assets/assets-router.js");
const historyRouter = require("./api/history/history-router.js");
const locationRouter = require("./api/locations/location-router");
const profileRouter = require("./api/aws/profile.js");
const demoRouter = require("./api/aws/S3getRouter");

require("dotenv").config();
const PORT = process.env.PORT || 8000;

require('./server/model/user_model');

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo')({session: expressSession});
const mongoose = require('mongoose');

const config = require('./server/config.js');

const app = express();
const server = require('http').Server(app);

//
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/amy", profileRouter);
app.use("/api/aws", demoRouter);
app.use("/api/assets", assetsRouter);
app.use("/api/history", historyRouter);
app.use("/api/location", locationRouter);


// require("dotenv").config();
// const server = require("./server/server");

// const PORT = process.env.PORT || 8000;

// server.listen(PORT, () => {
//   console.log("Server is currently running on port", PORT);
// });

if(!config.API_KEY){
    console.log("Please set your AUTHY_API_KEY environment variable before proceeding.");
    process.exit(1);
}

/**
 * Setup MongoDB connection.
 */
// mongoose.connect('mongodb://localhost:27017/authydemo').then(function(){
//   console.log(" Connected to Authy Demo ");
// }).catch(err => console.error(err));

mongoose.connect("mongodb://localhost:27017/authydemo", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});

const db = mongoose.connection;

app.use(cookieParser());
app.use(expressSession({
    'secret': config.SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Open the DB connection.
 */
db.once('open', function (err) {
    if(err){
        console.log("Error Opening the DB Connection: ", err);
        return;
    }
    app.use(expressSession({
        secret: config.SECRET,
        cookie: {maxAge: 60 * 60 * 1000},
        store: new mongoStore({
            mongooseConnection: mongoose.connection,
            collection: 'sessions',
            resave: true,
            saveUninitialized: true
        })
    }));
    const port = config.PORT || 5151;
    server.listen(port);
    console.log("Magic happening on port " + port);
});

db.on('error', console.error.bind(console, 'Connection Error:'));

const router = express.Router();

const users = require('./server/controllers/users.js');

router.route('/user/register').post(users.register);

router.route('/logout').get(users.logout);
router.route('/login').post(users.login);

/**
 * Authy Authentication API
 */
// router.route('/authy/sms').post(users.sms);
// router.route('/authy/voice').post(users.voice);
// router.route('/authy/verify').post(users.verify);
// router.route('/authy/onetouchstatus').post(users.checkonetouchstatus);
// router.route('/authy/onetouch').post(users.createonetouch);

// router.route('/loggedIn').post(users.loggedIn);

/**
 * Authy Phone Verification API
 */
router.route('/verification/start').post(users.requestPhoneVerification);
router.route('/verification/verify').post(users.verifyPhoneToken);

/**
 * Lookups
 */
// router.route('/lookup').post(users.lookupNumber);

/**
 * Require user to be logged in and authenticated with 2FA
 *
 * @param req
 * @param res
 * @param next
 */
function requirePhoneVerification(req, res, next) {
    if (req.session.ph_verified) {
        console.log("Phone Verified");
        next();
    } else {
        console.log("Phone Not Verified");
        res.redirect("/verification");
    }
}

// /**
//  * Require user to be logged in and authenticated with 2FA
//  *
//  * @param req
//  * @param res
//  * @param next
//  */
// function requireLoginAnd2FA(req, res, next) {
//     if (req.session.loggedIn && req.session.authy) {
//         console.log("RL2FA:  User logged and 2FA");
//         next();
//     } else if (req.session.loggedIn && !req.session.authy) {
//         console.log("RL2FA:  User logged in but no 2FA");
//         res.redirect("/2fa");
//     } else {
//         console.log("RL2FA:  User not logged in.  Redirecting.");
//         res.redirect("/login");
//     }
// }

/**
 * Require user to be logged in.
 *
 * @param req
 * @param res
 * @param next
 */
function requireLogin(req, res, next) {
    if (req.session.loggedIn) {
        console.log("RL:  User logged in");
        next();
    } else {
        console.log("RL:  User not logged in.  Redirecting.");
        res.redirect("/login");
    }
}

/**
 * Test for 200 response.  Useful when setting up Authy callback.
 */
router.route('/test').post(function(req, res){
    return res.status(200).send({"connected": true});
});

/**
 * All pages under protected require the user to be both logged in and authenticated via 2FA
 */
// app.all('/protected/*', requireLoginAnd2FA, function (req, res, next) {
//     next();
// });

/**
 * Require user to be logged in to view 2FA page.
 */
app.all('/2fa/*', requireLogin, function (req, res, next) {
    next();
});

/**
 * Prefix all router calls with 'api'
 */
app.use('/api', router);
app.use('/', express.static(__dirname + '/public'));
