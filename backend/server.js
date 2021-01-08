const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
//removed passport local
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./user");
const { Router } = require("express");

//----------------------END OF IMPORTS------------------------------------------------

mongoose.connect("Add MongoDB Link Here",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    () => {
        console.log("Mongoose Is Connected!");
    }
);

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);
app.use(
  session({
    secret: "buildingbigger",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("buildingbigger"));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

//----------------------END OF MIDDLEWARE------------------------------------------------

//Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      newUser.save();
      res.send("User Created");
    }
  });
});

app.get("/user", (req, res) => {
  res.send(req.user);
});

app.get("/logout", function(req, res){
  req.logout();
  res.send("Logged out");
});

function loggedIn(req, res, next) {
  if (req.user) {
      next();
  } else {
      res.redirect('/register');
  }
}

//----------------------END OF ROUTES------------------------------------------------

//Start Server
app.listen(4000, () => {
    console.log('Server Has Started');
});