import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import { Server } from 'socket.io';
import { connectDB } from '../backend/src/db/index.js';
import { app } from '../backend/app.js';
import { socketHandler } from './src/socketHandler.js';

const PORT = process.env.PORT || 8000;

// create http server
const server = http.createServer(app);

// Attach socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ["GET", "POST"],
    credentials: true,
  },
});
socketHandler(io);


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on Port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log('Mongodb connection error: ', error);
  });
