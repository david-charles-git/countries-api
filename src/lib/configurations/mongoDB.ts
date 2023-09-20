import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    const connection: any = await mongoose.connect(process.env.MONGODB_URI!);

    console.log(`MongoDB connected to host: ${connection.connection.host}`);
  } catch (error: any) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectToMongoDB;
