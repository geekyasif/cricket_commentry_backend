const mongoose = require("mongoose");

const teamScoreboardSchema = new mongoose.Schema({
  total_runs: { type: Number, default: 0 },
  total_wickets: { type: Number, default: 0 },
  total_wide_balls: { type: Number, default: 0 },
  total_no_balls: { type: Number, default: 0 },
  total_balls: { type: Number, default: 0 },
});

const playerSchema = new mongoose.Schema({
  runs: { type: Number, default: 0 },
  review: {
    type: String,
    enum: ["striker", "nonstriker", "unplayed", "played"],
    default: "unplayed",
  },
});

const scoreboardSchema = new mongoose.Schema({
  team_scoreboard: teamScoreboardSchema,
  players: { type: Map, of: playerSchema, default: {} },
});

const Scoreboard = mongoose.model("Scoreboard", scoreboardSchema);

module.exports = Scoreboard;
