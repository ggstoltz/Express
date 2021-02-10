// Dependencies
const express = require("express");

// Sets up the Express App
const PORT = process.env.PORT ||  3000;


const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./apiRoutes")(app);
require("./htmlRoutes")(app);

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});