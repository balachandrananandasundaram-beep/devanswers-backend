import mongoose from "mongoose";
import User from "./models/User.js";
import Question from "./models/Question.js";
import Answer from "./models/Answer.js";
import dotenv from "dotenv";

async function query1() {
  try {
    const user = await User.create({
      name: "Robin",
      email: "robin@example.com",
      password: "hashed_password_7",
      createdAt: new Date("2025-06-25T10:15:00Z")
    });
    console.log(user);
  } catch (err) {
    console.error("Error in Query 1:", err);
  }
}

async function query2() {
  try {
    const user = await User.findOne({ email: "alice@example.com" });
    console.log(user);
  } catch (err) {
    console.error("Error in Query 2:", err);
  }
}

async function query3() {
  try {
    const question = await Question.findOne({
      title: "How can I improve the performance of a react app?"
    });
    console.log(question);
  } catch (err) {
    console.error("Error in Query 3:", err);
  }
}

async function query4() {
  try {
    const questions = await Question.find({ tags: "javascript" });
    console.log(questions);
  } catch (err) {
    console.error("Error in Query 4:", err);
  }
}

async function query5() {
  try {
    const questions = await Question.find({
      createdAt: { $gt: new Date("2023-04-01") }
    });
    console.log(questions);
  } catch (err) {
    console.error("Error in Query 5:", err);
  }
}

async function query6() {
  try {
    const questions = await Question.find({
      tags: { $in: ["javascript", "react"] }
    });
    console.log(questions);
  } catch (err) {
    console.error("Error in Query 6:", err);
  }
}

async function query7() {
  try {
    const tags = await Question.distinct("tags");
    console.log(tags);
  } catch (err) {
    console.error("Error in Query 7:", err);
  }
}

async function query8() {
  try {
    const questions = await Question.find({ views: { $gte: 50 } });
    console.log(questions);
  } catch (err) {
    console.error("Error in Query 8:", err);
  }
}

async function query9() {
  try {
    const answers = await Answer.find({ voteCount: 0 });
    console.log(answers);
  } catch (err) {
    console.error("Error in Query 9:", err);
  }
}

async function query10() {
  try {
    const answers = await Answer.find({ voteCount: { $gt: 0 } });
    console.log(answers);
  } catch (err) {
    console.error("Error in Query 10:", err);
  }
}

async function query11() {
  try {
    const users = await User.find({
      createdAt: {
        $gte: new Date("2023-01-01"),
        $lt: new Date("2023-05-01")
      }
    });
    console.log(users);
  } catch (err) {
    console.error("Error in Query 11:", err);
  }
}

async function query12() {
  try {
    const question = await Question.findOne({
      title: "How do I set up routing with react router v6?"
    });

    if (!question) return console.log("Question not found");

    const answers = await Answer.find(
      { question: question._id },
      { text: 1, author: 1 }
    );

    console.log(answers);
  } catch (err) {
    console.error("Error in Query 12:", err);
  }
}

async function query13() {
  try {
    const usersWithAnswers = await Answer.distinct("author");
    const users = await User.find({ _id: { $nin: usersWithAnswers } });
    console.log(users);
  } catch (err) {
    console.error("Error in Query 13:", err);
  }
}

async function query14() {
  try {
    const topQuestions = await Question.find()
      .sort({ voteCount: -1 })
      .limit(2);

    console.log(topQuestions);
  } catch (err) {
    console.error("Error in Query 14:", err);
  }
}

async function query15() {
  try {
    const result = await Answer.aggregate([
      { $group: { _id: "$author", answerCount: { $sum: 1 } } }
    ]);

    console.log(result);
  } catch (err) {
    console.error("Error in Query 15:", err);
  }
}

async function query16() {
  try {
    const result = await Answer.aggregate([
      { $group: { _id: "$author", answerCount: { $sum: 1 } } },
      { $sort: { answerCount: -1 } },
      { $limit: 2 }
    ]);

    console.log(result);
  } catch (err) {
    console.error("Error in Query 16:", err);
  }
}

async function query17() {
  try {
    const updated = await Question.findOneAndUpdate(
      {
        title:
          "Why is my async function returning a promise instead of the actual value?"
      },
      { tags: ["javascript", "async"] },
      { new: true }
    );

    console.log(updated);
  } catch (err) {
    console.error("Error in Query 17:", err);
  }
}

async function query18() {
  try {
    const updated = await User.findOneAndUpdate(
      { email: "alice@example.com" },
      { name: "Alice Smith" },
      { new: true }
    );

    console.log(updated);
  } catch (err) {
    console.error("Error in Query 18:", err);
  }
}

async function query19() {
  try {
    const deleted = await User.findOneAndDelete({
      email: "jhonny@example.com"
    });

    console.log(deleted);
  } catch (err) {
    console.error("Error in Query 19:", err);
  }
}

async function query20() {
  try {
    const user = await User.findOne({ email: "alice@example.com" });
    if (!user) return console.log("User not found");

    const deleted = await Answer.deleteMany({ author: user._id });
    console.log(deleted);
  } catch (err) {
    console.error("Error in Query 20:", err);
  }
}

async function runQueries() {
  printHeader(
    1,
    "Create a user with name Robin, email robin@example.com, password hashed_password_7, and createdAt set to 2025-06-25T10:15:00Z",
  );
  await query1();
  printHeader(2, "Fetch the user with email alice@example.com");
  await query2();
  printHeader(
    3,
    'Fetch question with the title "How can I improve the performance of a react app?"',
  );
  await query3();
  printHeader(4, 'Find all questions tagged with "javascript"');
  await query4();
  printHeader(5, "Retrieve all questions posted after April 1, 2023");
  await query5();
  printHeader(6, "Find all questions tagged with javascript or react");
  await query6();
  printHeader(7, "Find all the distinct tags used in questions");
  await query7();
  printHeader(8, "Retrieve all questions with at least 50 views");
  await query8();
  printHeader(9, "List all answers with a vote count of 0");
  await query9();
  printHeader(10, "Retrieve all answers with a voteCount greater than 0");
  await query10();
  printHeader(
    11,
    "Retrieve all users whose account was created between January 1, 2023 (inclusive) and May 1, 2023 (exclusive)",
  );
  await query11();
  printHeader(
    12,
    'Fetch the answer text and author id of all answers for the question "How do I set up routing with react router v6?"',
  );
  await query12();
  printHeader(13, "Find all users who have not posted any answers");
  await query13();
  printHeader(14, "Find the top two most upvoted questions");
  await query14();
  printHeader(
    15,
    "Retrieve the ids of all users who have posted answers, along with the number of answers they have posted",
  );
  await query15();
  printHeader(16, "Identify the top two users who posted the most answers");
  await query16();
  printHeader(
    17,
    "Update the tags of the question 'Why is my async function returning a promise instead of the actual value?' to ['javascript', 'async']",
  );
  await query17();
  printHeader(
    18,
    "Update the name of the user with email 'alice@example.com' to 'Alice Smith'",
  );
  await query18();
  printHeader(19, "Delete the user with email 'jhonny@example.com'");
  await query19();
  printHeader(
    20,
    "Delete all answers of the user with email 'alice@example.com'",
  );
  await query20();
}

const printHeader = (num, title) => {
  console.log("\n" + "─".repeat(60));
  console.log(`Q${num}. ${title}`);
  console.log("─".repeat(60));
};

async function main() {
  try {
    dotenv.config();
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected successfully to database");
    await runQueries();
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  }
}

main();
