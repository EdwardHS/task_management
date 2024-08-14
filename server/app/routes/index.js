const express = require("express");
const router = express.Router();

// task routes
router.use("/tasks", require("./task.router"));

//base 
router.use('/', (req, res, next) => {
    res.status(404).json({message: "Route not found"});
});

module.exports = router;
