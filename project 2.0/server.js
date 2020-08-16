const fs = require("fs");
var express = require("express");
var path = require("path");
const app = express();
app.use(express.static("public"));
app.get("/static", express.static("public"));

app.get('/', (req, res) => {
    res.sendfile('index.html');
});


app.listen(3000, () => console.log('Gator app listening on port 3000!'));