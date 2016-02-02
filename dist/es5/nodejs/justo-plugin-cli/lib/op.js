"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 





op;var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var cmd, args, opts, res, output;


  params = params[0];

  cmd = params.command || params.cmd;
  args = params.arguments || params.args || [];
  output = params.hasOwnProperty("output") ? params.output : false;
  opts = { encoding: "utf-8" };

  if (params.workingDir || params.wd) opts.cwd = params.workingDir || params.wd;
  if (params.env) opts.env = params.env;
  if (params.stdin) opts.input = params.stdin;

  if (!cmd) throw new Error("Command to run expected.");


  res = _child_process2.default.spawnSync(cmd, args, opts);

  if (res.error) throw res.error;


  if (res.stdout) res.stdout = res.stdout.toString();
  if (res.stderr) res.stderr = res.stderr.toString();

  if (output) {
    if (res.stdout !== "" && res.stdout != "\n") console.log(res.stdout);
    if (res.stderr !== "" && res.stderr != "\n") console.log(res.stderr);}


  return { 
    exitCode: res.status, 
    stdout: res.stdout, 
    stderr: res.stderr };}