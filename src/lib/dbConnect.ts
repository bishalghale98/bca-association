import mongoose from "mongoose";

const MONGODBURI = process.env.MONGO_URI as string;

const dbConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Database is already connected 😊😊");
    return;
  }

  try {
    await mongoose.connect(MONGODBURI);
    console.log("Database connected successfully❤️");
  } catch (error) {
    console.error("Connection error:", error);
  }
};

export default dbConnect;
