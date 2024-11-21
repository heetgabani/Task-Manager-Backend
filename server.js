const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const taskRoutes = require('./routes/Tasks');
app.use('/api/tasks', taskRoutes);

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
