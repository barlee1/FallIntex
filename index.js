let express = require("express");

let app = express();

let path = require("path");

let security = false;

const port = 5500;

const bcrypt = require('bcrypt');

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));


// Routes to Pages
// home
app.get('/', (req, res) => {
    res.render('homepage', {
        title: 'Turtle Shelter Project',
        aboutText: 'Custom About Text if needed...',
        jensStory: 'Custom Story Text if needed...'
    });
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


app.post('/vlogin', async (req, res) => {
    const { VLogin, VPassword } = req.body;

    // Function to find userpassword by username
    async function findUserByUsername(username) {
        const result = await db('Volunteers')
            .select('VPassword')
            .where('Vlogin', username)
            .first();

        return result ? result.VPassword : null; // Return hashed password or null if not found
    }

    try {
        // Retrieve the hashed password from the database using the username
        const storedHashedPassword = await findUserByUsername(VLogin);

        if (!storedHashedPassword) {
            return res.status(401).send('Invalid username or password.');
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(VPassword, storedHashedPassword);

        if (isMatch) {
            res.send('Login Successful!');
        } else {
            res.status(401).send('Invalid username or password.');
        }
    } catch (error) {
        console.error('Error during login process:', error);
        res.status(500).send('An error occurred during the login process.');
    }
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
