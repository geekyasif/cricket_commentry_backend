function clearNonStrikerInputFieldOnRunWicket(io, socket) {
  socket.on("clear_non_striker_input", () => {
    socket.broadcast.to("all").emit("nonstriker_input_cleaned");
  });
}

module.exports = clearNonStrikerInputFieldOnRunWicket;
