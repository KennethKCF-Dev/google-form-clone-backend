const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  label: {
    type: String,
  },
  type: {
    type: String,
    enum: ["text", "dropdown"],
  },
  options: [String],
});

const FormSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  questions: [QuestionSchema],
  responses: [
    {
      type: Map,
      of: String,
    },
  ],
});

module.exports = mongoose.model("Form", FormSchema);
