import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: "string",
    min: 6,
    max: 32,
  },

  username: {
    type: "string",
    min: 6,
    max: 32,
    required: true,
  },

  password: {
    type: "string",
    min: 6,
    max: 32,
    required: true,
  },

  email: {
    type: "string",
    min: 6,
    max: 32,
    required: true,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
