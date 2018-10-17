// import dependencies
const express = require("express");

// initialize server and port number
const app = express();
//const PORT = 3000;
const PORT = process.env.PORT || 3000;

// set up express middleware (.json(), urlencoded)
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// import routes from other files and tell app to use them
require("./routing/apiRoutes")(app);
// ABOVE IS SAME AS THIS 
// const apiRoutes = require("./routes/api/apiRoutes");
// apiRoutes(app);

require("./routing/htmlRoutes")(app);

// turn on server (app.listen())
app.listen(PORT, function() {
  console.log(`App is now running on http://localhost:${PORT}`);
});