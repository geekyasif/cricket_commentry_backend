const Scoreboard = require("../models/scoreboard");

async function getUpdatedData() {
  const data = await Scoreboard.find();
  return data;
}

module.exports = getUpdatedData;
