function clearNonStrikerInputFieldOnRunWicket(io, socket) {
  socket.on("clear_non_striker_input", () => {
    try {
      socket.broadcast.to("all").emit("nonstriker_input_cleaned");
    } catch (error) {
      io.to("all").emit("error", {
        error: error,
        message: "Clear Non Striker Input Error!",
      });
    }
  });
}

module.exports = clearNonStrikerInputFieldOnRunWicket;
