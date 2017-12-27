var bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();

// App configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

// Routes
app.get("/", function(req, res) {
    res.render("index");
});

app.get("/payroll", function(req, res) {
    res.render("payroll");
});

app.post("/payroll/slip", function(req, res) {
    req.body.name = req.sanitize(req.body.name);
    res.render("slip", {employee: req.body});
});

var port = 3000 || process.env.PORT;

app.listen(port, function() {
    console.log("Server started.....\nvisit http://localhost:" + port);
});
