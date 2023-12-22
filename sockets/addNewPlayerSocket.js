const Scoreboard = require("../models/scoreboard");
const getUpdatedData = require("../services/getUpdatedData");

function addNewPlayerSocket(io, socket) {
  socket.on("add-new-player", async ({ scoreboardId, newPlayer }) => {
    await Scoreboard.updateOne(
      { _id: scoreboardId },
      {
        $set: {
          [`players.${Object.keys(newPlayer)[0]}`]: Object.values(newPlayer)[0],
        },
      }
    );

    // sending updated data to the frontend
    const updatedData = await getUpdatedData();
    io.to("all").emit("updatedScoreboard", updatedData);
  });
}

module.exports = addNewPlayerSocket;
