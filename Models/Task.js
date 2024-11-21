const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: String,
    deadline: Date,
    status: { type: String, default: "Pending" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model('Task', taskSchema);
