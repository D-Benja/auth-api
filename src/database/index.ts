import mongoose from "mongoose";
import config from "config";

async function connectToDatabase() {
  const dbUrl = config.get<string>("db_url");

  try {
    await mongoose.connect(dbUrl);

    console.log(`Successfully connected to the database!`);
  } catch (error) {
    console.log(error);
  }
}

export default connectToDatabase;
