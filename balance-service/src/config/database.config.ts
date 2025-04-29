import mongoose from 'mongoose';

export async function connectToMongo() {
  const uri = process.env.MONGO_URL || 'mongodb://mongo:27017/balance';
  await mongoose.connect(uri);
  console.log('MongoDB connected');
}
