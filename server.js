const app = require("./app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Scoreboard = require("./models/scoreboard");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

async function getUpdatedData() {
  const data = await Scoreboard.find();
  return data;
}

io.on("connection", (socket) => {
  console.log("socket listening....");

  // adding new player (striker and non striker) to the database
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
    socket.emit("updatedScoreboard", updatedData);
  });

  // updating the scoreboard and db with latest data
  socket.on("new-ball", async ({ scoreboardId, type, payload }) => {
    if (type === "run") {
      await Scoreboard.updateOne(
        { _id: scoreboardId },
        {
          $inc: {
            "team_scoreboard.total_runs": payload.runs,
            "team_scoreboard.total_balls": 1,
            [`players.${payload.onstrike}.runs`]: payload.runs,
          },
        }
      );
    }

    if (type === "wicket") {
      await Scoreboard.updateOne(
        { _id: scoreboardId },
        {
          $inc: {
            "team_scoreboard.total_wickets": 1,
            "team_scoreboard.total_balls": 1,
          },
          $set: {
            [`players.${payload.onstrike}.review`]: "played",
          },
        }
      );
    }

    // wide_ball or no_ball or wicket_no_ball
    if (
      type === "wide_ball" ||
      type === "no_ball" ||
      type === "wicket_no_ball" ||
      type === "wide_ball_no_ball" ||
      type === "no_ball_wide_ball"
    ) {
      await Scoreboard.updateOne(
        { _id: scoreboardId },
        {
          $inc: {
            "team_scoreboard.total_runs": payload.runs,
            [`players.${payload.onstrike}.runs`]: payload.runs,
          },
        }
      );
    }
    // sending updated data to the frontend
    const updatedData = await getUpdatedData();
    socket.emit("updatedScoreboard", updatedData);
  });

  socket.on("clear-scoreboard", async (id) => {
    await Scoreboard.deleteOne({ _id: id });
    console.log("deleted succesffulyy");
    const newScoreboard = new Scoreboard({
      team_scoreboard: {
        total_runs: 0,
        total_wickets: 0,
        total_wide_balls: 0,
        total_no_balls: 0,
        total_balls: 0,
      },
      players: {},
    });
    await newScoreboard.save();

    // sending updated data to the frontend
    const updatedData = await getUpdatedData();
    socket.emit("updatedScoreboard", updatedData);
  });
});

server.listen(8000, () => {
  console.log("Server is listening...");
});
