import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
};

app.listen(3000, () => {
  console.log('Auth service is running on port 3000!');
});

start();