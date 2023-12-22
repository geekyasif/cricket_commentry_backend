async function clearStrikerInputFieldOnWicket(io, socket) {
  socket.on("clear_striker_input", () => {
    socket.broadcast.to("all").emit("striker_input_cleaned");
  });
}

module.exports = clearStrikerInputFieldOnWicket;
