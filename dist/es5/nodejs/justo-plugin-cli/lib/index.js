//imports
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _justo = require("justo");

//api
exports["default"] = (0, _justo.task)("org.justojs", "cli", require("./cli"));
module.exports = exports["default"];
