const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const PitchData = require('../controller/pitch-controller');

router.route('/show').get(authMiddleware, PitchData.getUserPitches);
router.route('/showall').get(authMiddleware,PitchData.getAllPitches);
router.route('/submit').post(authMiddleware, PitchData.submitPitch);
// Assuming PitchData.deletePitch is a function to handle pitch deletion
router.route('/:id').delete(authMiddleware, PitchData.deletePitch);

module.exports = router;
