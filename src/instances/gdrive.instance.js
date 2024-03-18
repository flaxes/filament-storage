const { google } = require("../../config");
const Gdrive = require("../lib/gdrive");

const gdrive = new Gdrive(google);

module.exports = gdrive;
