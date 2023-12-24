const NewBallEvent = require("../models/newBallEvent");

async function saveNewBall({ scoreboardId, type, payload }) {
  const _new_ball_event = await NewBallEvent({
    scoreboardId,
    type,
    payload,
  });
  await _new_ball_event.save();
}

module.exports = saveNewBall;
