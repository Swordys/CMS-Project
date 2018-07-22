require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// --- Routes --- //
const conversation = require("./routes/conversation");

const app = express();

// --- Middleware --- //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// --- DB Config --- //
const db = process.env.MONGO_URI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// --- Use Routes --- //
app.use("/api/conversation", conversation);

// --- Server --- //
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
