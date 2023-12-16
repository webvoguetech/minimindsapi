import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
let client;

export const connectToMongoDB = async () => {
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB is connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    throw err; // Re-throw the error for better error handling upstream
  }
};

export const getDB = () => {
  if (!client) {
    throw new Error("MongoDB not connected");
  }
  return client.db("ExpenZap");
};
