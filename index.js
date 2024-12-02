let express = require("express");

let app = express();

let path = require("path");

let security = false;

const port = 5500;

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));

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
