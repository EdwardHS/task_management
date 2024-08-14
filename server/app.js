// read env variable
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/config.env" });

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const express = require("express");
const cors = require("cors");
const colors = require("colors");
const path = require("path");

const responseHandler = require("./app/middleware/responseHandler.middleware");

const app = express();
app.use(cors());
app.use(express.json());

app.use(responseHandler);
// API routes
app.use("/api/v1", require("./app/routes/index"));

module.exports = app;
