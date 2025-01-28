const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes'); // Import blog routes

dotenv.config();

const app = express();
connectDB(); // Connect to MongoDB

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use('/api/blogs', blogRoutes); // Mount blog routes

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
