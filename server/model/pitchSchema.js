const { Schema, model } = require("mongoose");
const User = require("./userSchema");

const pitchSchema = new Schema({
  entrepreneurId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  description: String,
  videoUrl: String,
  presentation: String,
  status: String,
  evaluation: {
    ratings: Number,
    feedback: String,
  },
});

// Export the Pitch model, not the pitchSchema
const Pitch = model("Pitch", pitchSchema);
module.exports = Pitch;
