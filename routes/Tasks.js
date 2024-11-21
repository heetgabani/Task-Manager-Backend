const express = require('express');
const Task = require('../Models/Task');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to authenticate user
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: "Unauthorized!" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Token invalid!" });
        req.userId = decoded.id;
        next();
    });
};

// Get Tasks
router.get('/', authenticate, async (req, res) => {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
});

// Create Task
router.post('/', authenticate, async (req, res) => {
    const newTask = new Task({ ...req.body, userId: req.userId });
    await newTask.save();
    res.status(201).json(newTask);
});

// Update Task
router.put('/:id', authenticate, async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

// Delete Task
router.delete('/:id', authenticate, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully!" });
});

module.exports = router;
