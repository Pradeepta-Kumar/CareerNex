import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./dbConnect/connectDB.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening to the PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed connecting to the server - ", err);
    throw new Error(err);
  });
