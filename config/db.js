/// database 
import mongoose from "mongoose";
const database_url = process.env.MONGODB_URI;

if (!database_url) {
  throw new Error(" Provided mongodb uri in .env file!");
}

const connectDatabase = async () => {
  try {
    let database = await mongoose.connect(database_url.toString().trim());
    console.log(`Connected to MongoDB with ${database.connection.port}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export default connectDatabase;
