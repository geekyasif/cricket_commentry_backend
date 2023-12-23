const mongoose = require("mongoose");

const ballEventSchema = new mongoose.Schema(
  {
    scoreboardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scoreboard",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "run",
        "wicket",
        "wide_ball",
        "no_ball",
        "run_wicket",
        "run_no_ball",
        "wicket_no_ball",
        "wide_ball_no_ball",
        "no_ball_wide_ball",
      ],
      required: true,
    },
    payload: {
      runs: {
        type: Number,
        default: 0,
      },
      ball: {
        type: Number,
        default: 0,
      },
      wicket: {
        type: Number,
        default: 0,
      },
      no_ball: {
        type: Number,
        default: 0,
      },
      wide_ball: {
        type: Number,
        default: 0,
      },
      onstrike: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const BallEvent = mongoose.model("BallEvent", ballEventSchema);
module.exports = BallEvent;
