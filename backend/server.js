import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../backend/src/db/index.js';
import { app } from '../backend/app.js';

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on Port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log('Mongodb connection error: ', error);
  });
