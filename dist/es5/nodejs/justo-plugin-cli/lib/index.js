//imports
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _justo = require("justo");

//api
exports["default"] = (0, _justo.simple)({ ns: "org.justojs", name: "cli" }, require("./cli"));
module.exports = exports["default"];
