//imports
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _justoPlugin = require("justo-plugin");

var child_process = require("child_process");
var util = require("util");

/**
 * Task for executing commands.
 */

var CliTask = (function (_SimpleTask) {
  /**
   * Constructor.
   */

  function CliTask() {
    _classCallCheck(this, CliTask);

    _get(Object.getPrototypeOf(CliTask.prototype), "constructor", this).call(this, "org.justojs", "cli", { desc: "Task for executing commands." }, task);
  }

  _inherits(CliTask, _SimpleTask);

  return CliTask;
})(_justoPlugin.SimpleTask);

exports.CliTask = CliTask;

/**
 * The task function.
 *
 * @param params:object The task parameters.
 */
function task(params) {
  var cmd, args, opts, stdout, stderr;

  //(1) arguments
  cmd = params.command;
  args = params.arguments || [];
  opts = { encoding: "utf8" };

  if (params.workingDir) opts.cwd = params.workingDir;
  if (params.env) opts.env = params.env;
  if (params.stdin) opts.input = params.stdin;

  if (!cmd) throw new _justoPlugin.PluginError("Command to run expected.");

  //(2) task
  run(cmd, args, opts, {
    stdout: params.stdout,
    stderr: params.stderr,
    exitCode: params.exitCode
  });

  //helper functions
  function run(cmd, args, opts, expected) {
    var res;

    //(1) run
    res = child_process.spawnSync(cmd, args, opts);

    //(2) check result
    if (expected.exitCode !== undefined && expected.exitCode !== null && expected.exitCode != res.status) {
      throw new _justoPlugin.PluginError("Exit code expected: '" + expected.exitCode + "'. Received: '" + res.status + "'.");
    }

    if (expected.stdout !== undefined && expected.output !== null && expected.stdout != res.stdout) {
      throw new _justoPlugin.PluginError("Standard output expected: " + util.inspect(expected.stdout) + ". Received: " + util.inspect(res.stdout) + ".");
    }

    if (expected.stderr !== undefined && expected.stderr !== null && expected.stderr != res.stderr) {
      throw new _justoPlugin.PluginError("Standard error output expected: " + util.inspect(expected.stderr) + ". Received: " + util.inspect(res.stderr) + ".");
    }
  }
}