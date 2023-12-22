const Scoreboard = require("../models/scoreboard");
const getUpdatedData = require("../services/getUpdatedData");

async function swapStrikerNonStriker(io, socket) {
  socket.on(
    "set_swap_players",
    async ({ scoreboardId, striker, nonStriker }) => {
      console.log(scoreboardId, striker, nonStriker);
      await Scoreboard.updateOne(
        { _id: scoreboardId },
        {
          $set: {
            [`players.${striker}.review`]: "nonstriker",
            [`players.${nonStriker}.review`]: "striker",
          },
        }
      );
      // sending updated data to the frontend
      const updatedData = await getUpdatedData();
      io.to("all").emit("updatedScoreboard", updatedData);
    }
  );
}

module.exports = swapStrikerNonStriker;
