let express = require("express");
let app = express();
let path = require("path");

// Configure view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Database connection using Knex.js
const knex = require("knex") ({
    client : "pg",
    connection : {
        host : process.env.RDS_HOSTNAME || "localhost",
        user : process.env.RDS_USERNAME || "kyleebrown",
        password : process.env.RDS_PASSWORD || "Admin",
        database : process.env.RDS_DB_NAME || "assignment3",
        port : process.env.RDS_PORT || 5432,
        ssl : process.env.DB_SSL ? {rejectUnauthorized : false} : false
    }
});


// ===================== Routes ===================== //

// Home Page
app.get("/", (req, res) => {
    res.render("homepage", {
        title: "Turtle Shelter Project",
        aboutText: "Custom About Text if needed...",
        jensStory: "Custom Story Text if needed...",
    });
});

// About Page
app.get("/about", (req, res) => {
    const error = null;
    res.render("about", { error });
});

// Volunteer Page
app.get("/volunteer", (req, res) => {
    const error = null;
    res.render("volunteer", { error });
});

// Donate Page
app.get("/donate", (req, res) => {
    res.render("donate", { title: "Donate" });
});



// Login Page
app.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});


// Create Account Page
app.get("/create-account", (req, res) => {
    res.render("create-account", { title: "Create Account" });
});

// Handle Create Account Form Submission
app.post("/create-account", async (req, res) => {
    const { firstname, lastname, email, city, state, phonenumber } = req.body;
    try {
        await knex("users").insert({
            firstname,
            lastname,
            email,
            city,
            state,
            phonenumber,
        });

        res.send("Account created successfully!");
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred. Please try again.");
    }
});

// ===================== Server Startup ===================== //

const port = process.env.PORT || 5500;
app.listen(port, () =>
    console.log(`Express App has started and server is listening on port ${port}!`)
);
