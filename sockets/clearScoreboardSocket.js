const Scoreboard = require("../models/scoreboard");
const getUpdatedData = require("../services/getUpdatedData");

function clearScoreboardSocket(io, socket) {
  socket.on("clear-scoreboard", async (id) => {
    await Scoreboard.deleteOne({ _id: id });
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

    // sending updated data to the frontend
    const updatedData = await getUpdatedData();
    io.to("all").emit("updatedScoreboard", updatedData);
  });
}

module.exports = clearScoreboardSocket;
