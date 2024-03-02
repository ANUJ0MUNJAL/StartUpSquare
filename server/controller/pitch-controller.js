const Pitch = require("../model/pitchSchema");

const getUserPitches = async (req, res) => {
  try {
    const entrepreneurId = req.user._id;
    const userPitches = await Pitch.find({ entrepreneurId });
    console.log("nahiii");
    res.status(200).json(userPitches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllPitches = async (req, res) => {
  try {
    // Fetch all pitches from the database and populate the entrepreneurId field with the user data
    const allPitches = await Pitch.find().populate('entrepreneurId', 'email');

    // Extract relevant information and send the response
    const pitchesWithEmail = allPitches.map((pitch) => ({
      _id: pitch._id,
      title: pitch.title,
      description: pitch.description,
      entrepreneurEmail: pitch.entrepreneurId.email,
      // Add other relevant pitch information as needed
    }));

    res.status(200).json(pitchesWithEmail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const submitPitch = async (req, res) => {
  try {
    // Extract data from the request body
    const { title, description, videoUrl, presentation } = req.body;

    // Assuming you have user authentication, retrieve the authenticated user's ID
    console.log("hello");
    const entrepreneurId = req.user._id;
    console.log(entrepreneurId);
    // Create a new pitch instance
    const newPitch = new Pitch({
      entrepreneurId,
      title,
      description,
      videoUrl,
      presentation,
      status: 'pending', // Set initial status, adjust as needed
      evaluation: { ratings: 0, feedback: '' }, // Initial evaluation data
    });

    // Save the pitch to the database
    const savedPitch = await newPitch.save();

    // Respond with the saved pitch data
    res.status(201).json(savedPitch);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deletePitch = async (req, res) => {
  const pitchId = req.params.id;

  try {
    // Assuming Pitch is your Mongoose model for pitches
    const deletedPitch = await Pitch.findByIdAndDelete(pitchId);

    if (!deletedPitch) {
      return res.status(404).json({ message: 'Pitch not found' });
    }

    res.status(200).json({ message: 'Pitch deleted successfully', deletedPitch });
  } catch (error) {
    console.error('Error deleting pitch:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { getUserPitches,getAllPitches, submitPitch,deletePitch };
