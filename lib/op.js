//imports
import child_process from "child_process";

/**
 * Run commands.
 */
export default function op(params, console) {
  var spawnOpts, opts, res;

  //(1) arguments
  if (params.length >= 1) opts = Object.assign({}, params[0]);
  if (!opts) opts = {};
  if (!opts.cmd) throw new Error("Command expected.");

  if (!opts.args) opts.args = [];
  if (typeof(opts.args) == "string") opts.args = [opts.args];
  if (opts.arg) opts.args.push(opts.arg);

  spawnOpts = {encoding: "utf-8"};

  if (opts.workDir || opts.wd) spawnOpts.cwd = opts.workDir || opts.wd;
  if (opts.env) spawnOpts.env = opts.env;
  if (opts.stdin) spawnOpts.input = opts.stdin;
  if (!opts.hasOwnProperty("exitCode")) opts.exitCode = 0;
  if (opts.hasOwnProperty("bg")) opts.background = opts.bg;

  //(2) run
  if (opts.bg) {
    spawnOpts.detached = true;
    spawnOpts.stdio = "ignore";
    res = child_process.spawn(opts.cmd, opts.args, spawnOpts);
    res.unref();
  } else {
    res = child_process.spawnSync(opts.cmd, opts.args, spawnOpts);
  }

  if (res.error) throw res.error;

  //(3) return result
  if (!opts.background) {
    if (res.stdout) res.stdout = res.stdout.toString();
    if (res.stderr) res.stderr = res.stderr.toString();

    if (opts.output) {
      if (res.stdout !== "" && res.stdout != "\n") console.log(res.stdout);
      if (res.stderr !== "" && res.stderr != "\n") console.log(res.stderr);
    }

    if (opts.exitCode !== undefined && res.status != opts.exitCode) {
      throw new Error(`Expected exit code ${opts.exitCode}; received ${res.status}.`);
    }
  }

  return {
    exitCode: res.status,
    stdout: res.stdout,
    stderr: res.stderr
  };
}
