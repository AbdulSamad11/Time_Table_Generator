const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;
const hours = fs.readFileSync("hours.html");
const rooms = fs.readFileSync("./rooms.html");
const courses = fs.readFileSync("./courses.html");
const teachers = fs.readFileSync("./teachers.html");
const tryy = fs.readFileSync("./try.html");

const server = http.createServer((req, res) => {
  url = req.url;
  console.log(url);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  if (url == "/") {
    res.end(hours);
  } else if (url == "/rooms.html") {
    res.end(rooms);
  } else if (url == "/courses.html") {
    res.end(courses);
  } else if (url == "/teachers.html") {
    res.end(teachers);
  } else if (url == "/try.html") {
    res.end(tryy);
  } else {
    res.end("<h1>404 file not found</h1>");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
