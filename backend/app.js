import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import videoRoutes from './src/routes/video.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import likesRoutes from './src/routes/likes.routes.js';
import commentsRoutes from './src/routes/comments.routes.js';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Server is running: ', process.env.PORT || 8000);
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/likes', likesRoutes);
app.use('/api/comments', commentsRoutes);

export { app };
