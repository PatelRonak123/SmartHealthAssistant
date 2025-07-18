import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbname: "Smart_Health_Assistant",
    });
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
