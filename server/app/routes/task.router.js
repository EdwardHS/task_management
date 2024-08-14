const express = require("express");
const router = express.Router();

const tasks = require("../controllers/task.controller");

//create task
router.post("/", tasks.create);

// retrieve all tasks
router.get("/", tasks.index);

// //retrieve task by specific id
router.get("/:id", tasks.findOne);

// //update task by specific id
router.put("/:id", tasks.update);

// //delete task by specific id
router.delete("/:id", tasks.delete);

// //update task to complete status by specific id
router.put("/complete/:id", tasks.markedAsComplete);

module.exports = router;
