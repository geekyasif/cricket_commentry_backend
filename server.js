const app = require("./app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const addNewPlayerSocket = require("./sockets/addNewPlayerSocket");
const newBallSocket = require("./sockets/newBallSocket");
const clearScoreboardSocket = require("./sockets/clearScoreboardSocket");
const swapStrikerNonStriker = require("./sockets/swapStrikerNonStriker");
const clearStrikerInputFieldOnWicket = require("./sockets/clearStrikerInputFieldOnWicket");
const clearNonStrikerInputFieldOnRunWicket = require("./sockets/clearNonStrikerInputFieldOnRunWicket");
const BallEvent = require("./models/ballEvent");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.join("all");

  // not wokring properly
  socket.on("save_event_to_db", async (event) => {
    // console.log("save_event_to_db", event);
    // const _new_event = new BallEvent(event);
    // await _new_event.save();
    socket.broadcast.to("all").emit("set_current_action", event);
  });

  // adding new player (striker and non striker) to the database
  addNewPlayerSocket(io, socket);

  // swapping the striker and non striker
  swapStrikerNonStriker(io, socket);

  // updating the scoreboard and db with latest data
  newBallSocket(io, socket);

  // clearing the striker input field on wicket on frontend
  clearStrikerInputFieldOnWicket(io, socket);
  clearNonStrikerInputFieldOnRunWicket(io, socket);

  // clearing scoreboard
  clearScoreboardSocket(io, socket);
});

server.listen(8000, () => {
  console.log("Server is listening...");
});
