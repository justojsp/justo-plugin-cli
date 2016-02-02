//imports
const suite = require("justo").suite;
const test = require("justo").test;
const cli = require("../../../dist/es5/nodejs/justo-plugin-cli/lib/op").default;

//suite
suite("#cli()", function() {
  test("Run command with input", function() {
    cli([{cmd: "node", stdin: "console.log(1+2)"}]).must.have({
      exitCode: 0,
      stdout: "3\n",
      stderr: ""
    });
  });

  test("Run command with arguments", function() {
    cli([{cmd: "node", args: ["--eval", "console.log(1+2)"]}]).must.have({
      exitCode: 0,
      stdout: "3\n",
      stderr: ""
    });
  });

  test("Run command with output expected", function() {
    cli([{cmd: "node", stdin: "console.log('Standard output'); console.error('Standard error output');"}]).must.have({
      exitCode: 0,
      stdout: "Standard output\n",
      stderr: "Standard error output\n"
    });
  });

  test("Run command with exit code expected", function() {
    cli([{cmd: "node", stdin: "process.exit(1)"}]).must.have({
      exitCode: 1,
      stdout: "",
      stderr: ""
    });
  });

  test("Run unknown command", function() {
    cli.must.raise(Error, [[{cmd: "unknown"}]]);
  });

  test("Run command with {output: true}", function() {
    cli([{
      cmd: "node",
      stdin: "console.log('Standard output'); console.error('Standard error output')",
      output: true
    }]).must.have({
      exitCode: 0,
      stdout: "Standard output\n",
      stderr: "Standard error output\n"
    });
  });

  test("Run command without output with {output: true}", function() {
    cli([{
      cmd: "node",
      stdin: "1+2"
    }]).must.have({
      exitCode: 0,
      stdout: "",
      stderr: ""
    })
  });
})();
