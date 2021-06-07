const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes.js");
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true});


//dotenv config
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Game API running application." });
});

app.use("/api/", routes);

const PORT = process.env.PORT || 6000;

//Express js listen method to run project on http://localhost:5000
app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
