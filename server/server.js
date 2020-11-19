const express = require("express");
require("dotenv").config();

//https configuration
const fs = require('fs')
const https = require('https');
const options = {
  key: fs.readFileSync('../etc/letsencrypt/live/onboard.zefenergy.com/privkey.pem'),
  cert: fs.readFileSync('../etc/letsencrypt/live/onboard.zefenergy.com/fullchain.pem')
};

const app = express();
const bodyParser = require("body-parser");
const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

//expres https configuration
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// Route includes
const userRouter = require('./routes/user.router');
const addUserRouter = require('./routes/addUser.router');
const organizationRouter = require('./routes/organization.router');
const siteRouter = require('./routes/site.router');
const breakerRouter = require('./routes/breaker.router');
const deviceRouter = require('./routes/device.router');
//const packageRouter = require('./routes/package.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/add-user', addUserRouter);
app.use('/api/organization', organizationRouter);
app.use('/api/site', siteRouter);
app.use('/api/breaker', breakerRouter);
app.use('/api/device', deviceRouter);
//app.use('/api/package', packageRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
httpsServer.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
