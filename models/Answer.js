import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },
  answerText: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
 // Tighten Schema defaults for vote arrays.  
  upvotes: {
  type: [mongoose.Schema.Types.ObjectId],
  ref: "User",
  default: [],
  validate: {
    validator: arr => arr.every(v => mongoose.Types.ObjectId.isValid(v)),
    message: "upvotes must contain valid ObjectIds only"
  }
},
downvotes: {
  type: [mongoose.Schema.Types.ObjectId],
  ref: "User",
  default: [],
  validate: {
    validator: arr => arr.every(v => mongoose.Types.ObjectId.isValid(v)),
    message: "downvotes must contain valid ObjectIds only"
  }},
  voteCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;