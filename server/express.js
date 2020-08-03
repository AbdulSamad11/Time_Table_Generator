const fs = require("fs");
var express = require("express");
var path = require("path");

const app = express();
app.use(express.static("public"));
app.use("/static", express.static("public"));
app.get("/", function (req, res) {
  res.sendfile("hours.html");
});

app.get("/rooms.html", function (req, res) {
  res.sendfile("rooms.html");
});
app.get("/courses.html", function (req, res) {
  res.sendfile("courses.html");
});

app.get("/teachers.html", function (req, res) {
  res.sendfile("teachers.html");
});

app.get("/try.html", function (req, res) {
  res.sendfile("try.html");
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on ${port}`));
