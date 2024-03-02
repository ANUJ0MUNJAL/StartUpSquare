const { Schema, model } = require("mongoose");
const User = require("./userSchema");

const pitchSchema = new Schema({
  entrepreneurId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: String,
  presentation: String,
  status: String,
  evaluation: {
    ratings: Number,
    feedback: String,
  },
  // New financial fields
  revenue: {
    type: Number,
    required: true,
  },
  expenses: {
    type: Number,
    required: true,
  },
  cogs: {
    type: Number,
    required: true,
  },
  costOfAsset: {
    type: Number,
    required: true,
  },
  salvageValue: {
    type: Number,
    required: true,
  },
  usefulLife: {
    type: Number,
    required: true,
  },
  investment: {
    type: Number,
    required: true,
  },
  equity: {
    type: Number,
    required: true,
  },
  promisedReturn: {
    type: Number,
    required: true,
  },
  years: {
    type: Number,
    required: true,
  },
});

// Export the Pitch model, not the pitchSchema
const Pitch = model("Pitch", pitchSchema);
module.exports = Pitch;
