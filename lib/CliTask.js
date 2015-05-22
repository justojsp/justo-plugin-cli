/**
 * Task for executing commands.
 */
export class CliTask extends SimpleTask {
  /**
   * Constructor.
   */
  constructor() {
    super("org.justojs", "cli", {desc: "Task for executing commands."}, task);
  }
}

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
  opts = {encoding: "utf8"};

  if (params.workingDir) opts.cwd = params.workingDir;
  if (params.env) opts.env = params.env;
  if (params.stdin) opts.input = params.stdin;

  if (!cmd) throw new PluginError("Command to run expected.");

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
      throw new PluginError(`Exit code expected: '${expected.exitCode}'. Received: '${res.status}'.`);
    }

    if (expected.stdout !== undefined && expected.output !== null && expected.stdout != res.stdout) {
      throw new PluginError(`Standard output expected: ${util.inspect(expected.stdout)}. Received: ${util.inspect(res.stdout)}.`);
    }

    if (expected.stderr !== undefined && expected.stderr !== null && expected.stderr != res.stderr) {
      throw new PluginError(`Standard error output expected: ${util.inspect(expected.stderr)}. Received: ${util.inspect(res.stderr)}.`);
    }
  }
}
