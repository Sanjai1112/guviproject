require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const cors = require("cors");

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true },
  (err, db) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("connection established");
    }
  }
);

//MiddleWare To  avoid cors error
// app.use(cors({ origin: "https://guviproj.herokuapp.com/ " }));

//MiddleWare To  avoid cors error
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hi");
});
app.post("/signup", async (req, res) => {
  console.log("sign up called");
  // console.log(req.body.data);
  let alreadyExists = false;
  await User.findOne({ username: req.body.data.username }, (err, result) => {
    if (result == null || result.length === 0) {
      return;
    } else if (err) {
      console.log(err.message);
    } else {
      console.log(result);
      alreadyExists = true;
    }
  });
  // await console.log(alreadyExists);
  if (!alreadyExists) {
    console.log(req.body.data);
    await User.create(
      {
        username: req.body.data.username,
        password: req.body.data.password,
        name: req.body.data.name,
        age: req.body.data.age,
        dob: req.body.data.dob,
        phone: req.body.data.phone
      },
      (err, user) => {
        if (err) {
          console.log("error occured");
          res.send({ isError: true, message: err.message });
        } else {
          console.log("Success");
          res.send({
            isError: false,
            message: {
              id: user._id,
              name: user.name,
              age: user.age,
              dob: user.dob,
              phone: user.phone
            }
          });
        }
      }
    );
  } else {
    res.send({ isError: true, message: "Already username exists" });
  }
});

//login route
app.post("/login", (req, res) => {
  console.log("login called");
  User.findOne({ username: req.body.data.username }, (err, result) => {
    if (result == null || result.length === 0) {
      console.log("Username does not exists ");
      res.send({ isError: true, message: "Username does not exists" });
    } else if (err) {
      console.log(err.message);
      res.send({ isError: true, message: err.message });
    } else {
      if (result.password === req.body.data.password) {
        console.log("Successfully logedIn");
        // console.log(result);
        res.send({
          isError: false,
          message: {
            id: result._id,
            name: result.name,
            age: result.age,
            dob: result.dob,
            phone: result.phone
          }
        });
      } else {
        console.log("Username or password is Incorrect");
        res.send({
          isError: true,
          message: "Username or password is Incorrect"
        });
      }
    }
  });
});
app.get("/details/:id", (req, res) => {
  User.findById(req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ isError: true, message: err.message });
    } else
      res.send({
        isError: false,
        message: {
          userid: result._id,
          name: result.name,
          age: result.age,
          dob: result.dob,
          phone: result.phone
        }
      });
  });
});
app.post("/details", (req, res) => {
  // console.log(req.body.data);
  User.findByIdAndUpdate(req.body.data.id, req.body.data, (err, result) => {
    if (err) {
      console.log(err.message);
      res.send({ isError: true, message: err.message });
    } else {
      // console.log("Fetched result " + result);
      res.send({
        isError: false,
        message: {
          id: result.id,
          name: result.name,
          phone: result.phone,
          age: result.age,
          dob: result.dob
        }
      });
    }
  });
});

app.get("/logout", (req, res) => {
  res.send({ message: "Sigout called" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
