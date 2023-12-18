const mongoose = require("mongoose");
require("dotenv").config();

const getConnectionString = () => {
  let connectionUrl;
  if (process.env.NODE_ENV === "development") {
    connectionUrl = process.env.DATABASE_LOCAL;
    connectionUrl = connectionUrl.replace(
      "<username>",
      process.env.DATABASE_LOCAL_USERNAME
    );
    connectionUrl = connectionUrl.replace(
      "<password>",
      process.env.DATABASE_LOCAL_PASSWORD
    );
  } else {
    connectionUrl = process.env.DATABASE_PROD;
  }
  return connectionUrl;
};

const connectDB = async () => {
  console.log("Database Connecting...");
  const monogURI = getConnectionString();
  await mongoose.connect(monogURI, { dbName: process.env.DB_NAME });
  console.log("Database Connected.");
};

module.exports = connectDB;
