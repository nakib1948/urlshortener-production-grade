require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const app = express();

const passport = require("passport");
const registerUser = require("./register");
const port = process.env.PORT || 3002;
const initializePassport = require("../passportConfig");
const createShortUrl = require("./createShortUrl");
const redirecturl = require("./redirecturl");
const updateurl = require("./updateurl");
const adminUpdateUrl = require("./adminUpdateUrl");
const deleteurl = require("./deleteurl");
const adminDeleteUrl = require("./adminDeleteUrl");
const adminDeleteUser = require("./adminDeleteUser");
const allurl = require("./allurl");
const updateurlexpiration=require('./urlExpiration/updateurlexpiration')
const {loginvalidation}=require("../SchemaValidation/loginschema")
const checkExpiredUrls=require('./urlExpiration/urlexpiration')
initializePassport(passport);

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.DB_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



setInterval(checkExpiredUrls, 5000)


app.get("/", async (req, res) => {
  await allurl(req, res);
});

app.post("/shorturl", async (req, res) => {
  await createShortUrl(req, res);
});

app.get("/deleteurl/:shorturl", async (req, res) => {
  if (req.isAuthenticated()) {
    await deleteurl(req, res);
  } else return res.status(400).json({ error: "Please login to delete url" });
});

app.get("/adminDeleteUrl/:shorturl", async (req, res) => {
  if (req.isAuthenticated()) {
    await adminDeleteUrl(req, res);
  } else return res.status(400).json({ error: "Please login to delete url" });
});
app.get("/adminDeleteUser/:email", async (req, res) => {
  if (req.isAuthenticated()) {
    await adminDeleteUser(req, res);
  } else return res.status(400).json({ error: "Please login to delete user" });
});

app.put("/updateurl/:shorturl", async (req, res) => {
  if (req.isAuthenticated()) {
    await updateurl(req, res);
  } else return res.status(400).json({ error: "Please login to update url" });
});
app.put("/adminupdateurl/:shorturl", async (req, res) => {
  if (req.isAuthenticated()) {
    await adminUpdateUrl(req, res);
  } else return res.status(400).json({ error: "Please login to update url" });
});

app.put("/updateurlexpiration/:shorturl", async (req, res) => {
  if (req.isAuthenticated()) {
    await updateurlexpiration(req, res);
  } else return res.status(400).json({ error: "Please login to update url expiration" });
});

app.post("/users/register", async (req, res) => {
  await registerUser(req, res);
});

app.post(
  "/users/login",loginvalidation,
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/error",
  })
);

app.post("/users/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/homepage");
  });
});

app.get("/homepage", (req, res) => {
  res.send("logout successful");
});

app.get("/users/dashboard", (req, res) => {
  res.send("login successful");
});

app.get("/error", (req, res) => {
  res.send("username and password incorrect");
});

app.get("/:shortUrl", async (req, res) => {
  await redirecturl(req, res);
});
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
