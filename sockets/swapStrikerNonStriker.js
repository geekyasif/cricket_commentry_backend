const Scoreboard = require("../models/scoreboard");
const getUpdatedData = require("../services/getUpdatedData");

async function swapStrikerNonStriker(io, socket) {
  socket.on(
    "set_swap_players",
    async ({ scoreboardId, striker, nonStriker }) => {
      try {
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
      } catch (error) {
        io.to("all").emit("error", {
          error: error,
          message: "Swap Striker Non Striker Error!",
        });
      }
    }
  );
}

module.exports = swapStrikerNonStriker;
