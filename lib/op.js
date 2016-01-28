//imports
import child_process from "child_process";

/**
 * Run commands.
 */
export default function op(params) {
  var cmd, args, opts, res;

  //(1) arguments
  params = params[0];

  cmd = params.command || params.cmd;
  args = params.arguments || params.args || [];
  opts = {encoding: "utf-8"};

  if (params.workingDir || params.wd) opts.cwd = params.workingDir || params.wd;
  if (params.env) opts.env = params.env;
  if (params.stdin) opts.input = params.stdin;

  if (!cmd) throw new Error("Command to run expected.");

  //(2) run
  res = child_process.spawnSync(cmd, args, opts);

  if (res.error) throw res.error;

  //(3) return result
  if (res.stdout) res.stdout = res.stdout.toString();
  if (res.stderr) res.stderr = res.stderr.toString();

  return {
    exitCode: res.status,
    stdout: res.stdout,
    stderr: res.stderr
  };
}
