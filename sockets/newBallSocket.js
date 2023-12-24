const Scoreboard = require("../models/scoreboard");
const getUpdatedData = require("../services/getUpdatedData");
const saveNewBall = require("../services/saveNewBall");

function newBallSocket(io, socket) {
  socket.on("new-ball", async ({ scoreboardId, type, payload }) => {
    try {
      // saving new ball event to db
      saveNewBall({ scoreboardId, type, payload });

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

      if (type === "run_wicket") {
        await Scoreboard.updateOne(
          { _id: scoreboardId },
          {
            $inc: {
              "team_scoreboard.total_runs": payload.runs,
              "team_scoreboard.total_wickets": 1,
              "team_scoreboard.total_balls": 1,
            },
            $set: {
              [`players.${payload.onstrike}.runs`]: payload.runs,
              [`players.${payload.onstrike}.review`]: "played",
            },
          }
        );
      }

      if (type === "run_no_ball") {
        await Scoreboard.updateOne(
          { _id: scoreboardId },
          {
            $inc: {
              "team_scoreboard.total_runs": payload.runs,
              "team_scoreboard.total_no_balls": 1,
            },
            $set: {
              [`players.${payload.onstrike}.runs`]: payload.runs,
            },
          }
        );
      }

      if (type === "wide_ball") {
        await Scoreboard.updateOne(
          { _id: scoreboardId },
          {
            $inc: {
              "team_scoreboard.total_runs": payload.runs,
              "team_scoreboard.total_wide_balls": 1,
              [`players.${payload.onstrike}.runs`]: payload.runs,
            },
          }
        );
      }

      if (type === "no_ball") {
        await Scoreboard.updateOne(
          { _id: scoreboardId },
          {
            $inc: {
              "team_scoreboard.total_runs": payload.runs,
              "team_scoreboard.total_no_balls": 1,
              [`players.${payload.onstrike}.runs`]: payload.runs,
            },
          }
        );
      }

      if (type === "wide_ball_no_ball" || type === "no_ball_wide_ball") {
        await Scoreboard.updateOne(
          { _id: scoreboardId },
          {
            $inc: {
              "team_scoreboard.total_runs": payload.runs,
              "team_scoreboard.total_no_balls": 1,
              [`players.${payload.onstrike}.runs`]: payload.runs,
            },
          }
        );
      }

      if (type === "wicket_no_ball") {
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
      io.to("all").emit("updatedScoreboard", updatedData);
    } catch (error) {
      io.to("all").emit("error", {
        error: error,
        message: "New Ball Error!",
      });
    }
  });
}

module.exports = newBallSocket;
