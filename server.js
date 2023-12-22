const app = require("./app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const addNewPlayerSocket = require("./sockets/addNewPlayerSocket");
const newBallSocket = require("./sockets/newBallSocket");
const clearScoreboardSocket = require("./sockets/clearScoreboardSocket");
const Scoreboard = require("./models/scoreboard");
const getUpdatedData = require("./services/getUpdatedData");
const swapStrikerNonStriker = require("./sockets/swapStrikerNonStriker");
const setPlayerReviewPlayed = require("./sockets/clearStrikerInputFieldOnWicket");
const clearStrikerInputFieldOnWicket = require("./sockets/clearStrikerInputFieldOnWicket");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.join("all");

  // adding new player (striker and non striker) to the database
  addNewPlayerSocket(io, socket);

  // swapping the striker and non striker
  swapStrikerNonStriker(io, socket);

  // updating the scoreboard and db with latest data
  newBallSocket(io, socket);

  // clearing the striker input field on wicket on frontend
  clearStrikerInputFieldOnWicket(io, socket);

  // clearing scoreboard
  clearScoreboardSocket(io, socket);
});

server.listen(8000, () => {
  console.log("Server is listening...");
});
