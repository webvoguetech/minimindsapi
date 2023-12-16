import express from 'express';
import dotenv from "dotenv"
dotenv.config()
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import categoryRoutes from './routes/categoryRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import userRoutes from "./routes/userRoutes.js"
import session from 'express-session';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(session({
  secret:'QweEwqrtqwaswwasjcjvdfhsmvfkkcgfdnssnxgcc',
  resave:false,
  saveUninitialized:true,
}))
app.use('/api/user', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/quizzes', quizRoutes);
app.use('/results', resultRoutes);
app.use('/leaderboards', leaderboardRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});