const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const compression = require('compression');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(compression({
  level: 6
}))

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./Utilities/authorization");
// db.sequelize.sync(); //TODO


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./Order/route")(app);

// set port, listen for requests
const PORT =  8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

