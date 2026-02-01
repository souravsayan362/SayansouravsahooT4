import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './src/db/connect.js';
import taskRouter from './src/routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRouter);

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () =>
  console.log(`TaskFlow DB running on port ${PORT}`)
);
