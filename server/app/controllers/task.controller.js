const expressAsyncHandler = require('express-async-handler');
const statusConfig = require("../config/status.config.js");
const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;

exports.create = expressAsyncHandler(async (req, res) => {
  const task = {
    title: req.body.title,
    description: req.body.description,
    status: statusConfig.tasks.INCOMPLETE
  };

  const data = await Task.create(task);
  res.success(data);
});

exports.index = expressAsyncHandler(async (req, res) => {
  const data = await Task.findAll();
  res.success(data);
});

exports.findOne = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const data = await Task.findByPk(id);

  if(data)
    res.success(data);
  else
    res.error(`Cannot find Task with id=${id}.`, 404);
});

exports.update = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const [data] = await Task.update(req.body, {
    where: {id: id}
  });

  console.log(data);

  if (data === 1)
    res.success(null, "Task successfully updated.");
  else 
    res.error("Task not found! Failed to update", 400);
});

exports.delete = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const data = await Task.destroy({
    where: {id: id}
  });

  if (data === 1)
    res.success(null, "Task successfully deleted.");
  else 
    res.error("Task not found! Failed to delete", 400);
});

exports.markedAsComplete = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const [data] = await Task.update({status: statusConfig.tasks.COMPLETE}, {
    where: {id: id, status: statusConfig.tasks.INCOMPLETE}
  });

  console.log(data);

  if (data === 1)
    res.success(null, "Task successfully updated.");
  else 
    res.error("Task not found! Failed to update", 400);
});

exports.markedAsPending = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const [data] = await Task.update({status: statusConfig.tasks.INCOMPLETE}, {
    where: {id: id, status: statusConfig.tasks.COMPLETE}
  });

  console.log(data);

  if (data === 1)
    res.success(null, "Task successfully updated.");
  else 
    res.error("Task not found! Failed to update", 400);
});