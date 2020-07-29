const express = require("express");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
const csrfProtection = csrf({ cookie: true })

const port = process.env.PORT || 3000;

app.set("view engine", "pug");

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.get("/", (req, res) => {
  res.render('index', { users: users })
});

app.get("/create", csrfProtection, (req, res) => {
  res.render("user-form", {
    title: "Create User",
    csrfToken: req.csrfToken()
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
