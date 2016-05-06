"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 





op;var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var spawnOpts, opts, res;


  if (params.length >= 1) opts = Object.assign({}, params[0]);
  if (!opts) opts = {};
  if (!opts.cmd) throw new Error("Command expected.");

  if (!opts.args) opts.args = [];
  if (typeof opts.args == "string") opts.args = [opts.args];
  if (opts.arg) opts.args.push(opts.arg);

  spawnOpts = { encoding: "utf-8" };

  if (opts.workingDir || opts.wd) spawnOpts.cwd = opts.workingDir || opts.wd;
  if (opts.env) spawnOpts.env = opts.env;
  if (opts.stdin) spawnOpts.input = opts.stdin;


  if (opts.bg) {
    spawnOpts.detached = true;
    spawnOpts.stdio = "ignore";
    res = _child_process2.default.spawn(opts.cmd, opts.args, spawnOpts);
    res.unref();} else 
  {
    res = _child_process2.default.spawnSync(opts.cmd, opts.args, spawnOpts);}


  if (res.error) throw res.error;


  if (!opts.background) {
    if (res.stdout) res.stdout = res.stdout.toString();
    if (res.stderr) res.stderr = res.stderr.toString();

    if (opts.output) {
      if (res.stdout !== "" && res.stdout != "\n") console.log(res.stdout);
      if (res.stderr !== "" && res.stderr != "\n") console.log(res.stderr);}}



  return { 
    exitCode: res.status, 
    stdout: res.stdout, 
    stderr: res.stderr };}