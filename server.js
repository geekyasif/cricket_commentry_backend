const app = require("./app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const addNewPlayerSocket = require("./sockets/addNewPlayerSocket");
const newBallSocket = require("./sockets/newBallSocket");
const clearScoreboardSocket = require("./sockets/clearScoreboardSocket");

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

  // updating the scoreboard and db with latest data
  newBallSocket(io, socket);

  // clearing scoreboard
  clearScoreboardSocket(io, socket);
});

server.listen(8000, () => {
  console.log("Server is listening...");
});
