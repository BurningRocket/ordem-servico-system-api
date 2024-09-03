import mongoose from 'mongoose';

export class Database {
  constructor() { }

  private uri = process.env.MONGODB_URI || "mongodb://localhost:27017/express-mongoose";

  connect = () => {
    mongoose
      .connect(this.uri)
      .then(() => {
        console.log("Successfully connected to database");
      })
      .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
  };
}
