//imports
const cli = require("../../../dist/es5/nodejs/justo-plugin-cli/lib/cli");

//suite
describe("#cli()", function() {
  it("Run command with input", function() {
    cli([{cmd: "node", stdin: "console.log(1+2)"}]).must.have({
      exitCode: 0,
      stdout: "3\n",
      stderr: ""
    });
  });

  it("Run command with arguments", function() {
    cli([{cmd: "node", args: ["--eval", "console.log(1+2)"]}]).must.have({
      exitCode: 0,
      stdout: "3\n",
      stderr: ""
    });
  });

  it("Run command with output expected", function() {
    cli([{cmd: "node", stdin: "console.log('Standard output'); console.error('Standard error output');"}]).must.have({
      exitCode: 0,
      stdout: "Standard output\n",
      stderr: "Standard error output\n"
    });
  });

  it("Run command with exit code expected", function() {
    cli([{cmd: "node", stdin: "process.exit(1)"}]).must.have({
      exitCode: 1,
      stdout: "",
      stderr: ""
    });
  });

  it("Run unknown command", function() {
    cli.must.raise(Error, [[{cmd: "unknown"}]]);
  });
});