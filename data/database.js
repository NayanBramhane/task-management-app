import mongoose from "mongoose";

const connectDB = () => {
    mongoose
  .connect(process.env.MONGO_URI, { dbName: "backendapi" })
  .then((c) => console.log(`Database connected with ${c.connection.host} `))
  .catch((e) => console.log("Error Occurred \n", e));
}

export default connectDB;