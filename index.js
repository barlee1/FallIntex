let express = require("express");
let app = express();
let path = require("path");

let security = false;

const port = 5500;

// Configure view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Database connection using Knex.js
const knex = require("knex")({
    client: "pg",
    connection: {
        host: "localhost",
        user: "kyleebrown",
        password: "Admin",
        database: "assignment3",
        port: 5432,
    },
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
    res.render("about", { error }); // Pass 'error' to the template
});

// Volunteer Page
app.get("/volunteer", (req, res) => {
    const error = null;
    res.render("volunteer", { error }); // Pass 'error' to the template
});

// Donate Page
app.get("/donate", (req, res) => {
    const error = null;
    res.render("donate", { error }); // Pass 'error' to the template
});

// ===================== Login & Create Account ===================== //

// Login Page
app.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

// Handle Login Form Submission
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        // Query the database to check user credentials
        const user = await knex("users")
            .where({ username, password }) // Simple check for now, use hashed passwords in production
            .first();

        if (user) {
            res.send(`Welcome back, ${user.username}!`); // Replace with redirect to dashboard
        } else {
            res.render("login", { title: "Login", error: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred. Please try again.");
    }
});

// Create Account Page
app.get("/create-account", (req, res) => {
    res.render("create-account", { title: "Create Account" });
});

// Handle Create Account Form Submission
app.post("/create-account", async (req, res) => {
    const { firstname, lastname, email, city, state, phonenumber } = req.body;
    try {
        // Insert user details into the database
        await knex("users").insert({
            firstname,
            lastname,
            email,
            city,
            state,
            phonenumber,
        });

        res.send("Account created successfully!"); // Replace with redirect to login page or dashboard
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred. Please try again.");
    }
});

// ===================== Server Startup ===================== //

app.listen(port, () =>
    console.log(`Express App has started and server is listening on port ${port}!`)
);
