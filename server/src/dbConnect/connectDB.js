import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionObj = await mongoose.connect(process.env.DATABASE_URI);
    console.log(
      "MongoDB connection established at DB HOST - ",
      connectionObj.connection.host
    );
  } catch (error) {
    console.log("Error while connecting the Database", error);
    process.exit(1);
  }
};

export default connectDB;
