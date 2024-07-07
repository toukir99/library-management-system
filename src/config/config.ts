import mongoose from 'mongoose';

// Database connection function
const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://localhost:27017/library-management-system");
    console.log('Database Connected!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

export default connectToDatabase;
