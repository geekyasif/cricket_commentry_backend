async function clearStrikerInputFieldOnWicket(io, socket) {
  socket.on("clear_striker_input", () => {
    try {
      socket.broadcast.to("all").emit("striker_input_cleaned");
    } catch (error) {
      io.to("all").emit("error", {
        error: error,
        message: "Clear Striker Input Error!",
      });
    }
  });
}

module.exports = clearStrikerInputFieldOnWicket;
