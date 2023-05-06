require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const app = express();

const passport = require("passport");
const registerUser = require("./src/register");
const port = process.env.PORT || 3002;
const initializePassport = require("./src/passportConfig");
const createShortUrl = require("./src/createShortUrl");
const redirecturl = require("./src/redirecturl");
const updateurl = require("./src/updateurl");
const deleteurl = require("./src/deleteurl");
const allurl = require("./src/allurl");

initializePassport(passport);

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get("/", async (req, res) => {
  await allurl(req, res);
});

app.post("/shorturl", async (req, res) => {
  await createShortUrl(req, res);
});

app.get("/:shortUrl", async (req, res) => {
  await redirecturl(req, res);
});

app.get("/deleteurl/:shorturl", async (req, res) => {
  if (req.isAuthenticated()) {
    await deleteurl(req, res);
  } else return res.status(400).json({ error: "Please login to delete url" });
});

app.put("/updateurl/:shorturl", async (req, res) => {
  if (req.isAuthenticated()) {
    await updateurl(req, res);
  } else return res.status(400).json({ error: "Please login to update url" });
});

app.post("/users/register", async (req, res) => {
  await registerUser(req, res);
});

app.post(
  "/users/login",
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/login",
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

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
