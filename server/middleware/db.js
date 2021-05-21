import mongoose from "mongoose";
import next from "next";

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(
    `${process.env.MONGO_URL}${process.env.MONGO_INITDB_DATABASE}`,
    {
      user: `${process.env.MONGO_INITDB_USERNAME}`,
      pass: `${process.env.MONGO_INITDB_PASSWORD}`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    }
  );
}

export function jsonify(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default async function dbMiddleware(req, res, next) {
  try {
    if(!global.mongoose) {
      global.mongoose == dbConnect()
    }
  } catch(e) {
    console.error(e)
  }

  return next()
}