const express = require("express");
const Scoreboard = require("../models/scoreboard");
const router = express.Router();

router.get("/scoreboard", async (req, res) => {
  const scoreboard = await Scoreboard.findOne();
  if (!scoreboard) {
    const newScoreboard = new Scoreboard({
      team_scoreboard: {
        total_runs: 0,
        total_wickets: 0,
        total_wide_balls: 0,
        total_no_balls: 0,
        total_balls: 0,
      },
      players: {},
    });
    await newScoreboard.save();
    res.json({ data: newScoreboard });
  } else {
    const scoreboard = await Scoreboard.find();
    res.json({ data: scoreboard });
  }
});

module.exports = router;
