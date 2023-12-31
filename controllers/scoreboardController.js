const Scoreboard = require("../models/scoreboard");

async function scoreboardController(req, res) {
  try {
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
      res.json({ code: 200, error: "", message: "", data: newScoreboard });
    } else {
      const scoreboard = await Scoreboard.find();
      res.json({
        code: 200,
        error: "",
        message: "",
        data: scoreboard,
      });
    }
  } catch (error) {
    res.json({
      code: 501,
      error: error,
      message: "Internal server error",
    });
  }
}

module.exports = scoreboardController;
