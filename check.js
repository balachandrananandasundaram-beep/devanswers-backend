import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Question from "./models/Question.js";
import Answer from "./models/Answer.js";

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);

  const users = await User.find({});
  console.log("Users:", users);

  const questions = await Question.find({});
  console.log("Questions:", questions);

  const answers = await Answer.find({});
  console.log("Answers:", answers);

  await mongoose.disconnect();
}

run(); 
