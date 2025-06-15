const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const errHandler = require('./middleware/errMiddleWare'); // Error middleware (should come after all routes)

dotenv.config();
connectDB();

const app = express();

//Security Middlewares
app.use(helmet()); // Adds security headers
app.use(express.json({ limit: '10kb' })); // Limit JSON body to prevent large payload attacks
app.disable('x-powered-by'); // Hide tech stack

//API Routes
app.use('/api/users', userRoutes);

//Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler should be placed AFTER routes
app.use(errHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
