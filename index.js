let express = require("express");

let app = express();

let path = require("path");

let security = false;

const port = 5500;

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

// Routes to Pages
// home
app.get('/', (req, res) => {
    const error = null;
    res.render("home", { error }); // Pass 'error' to the template
});

//about
app.get('/about', (req, res) => {
    const error = null;
    res.render("about", { error }); // Pass 'error' to the template
});

//Volunteer
app.get('/volunteer', (req, res) => {
    const error = null;
    res.render("volunteer", { error }); // Pass 'error' to the template
});

//donate
app.get('/donate', (req, res) => {
    const error = null;
    res.render("donate", { error }); // Pass 'error' to the template
});

const knex = require("knex") ({
    client : "pg",
    connection : {
        host : "localhost",
        user : "kyleebrown",
        password : "Admin",
        database : "assignment3",
        port : 5432
    }
});


app.listen(port, () => console.log("Express App has started and server is listening!"));
