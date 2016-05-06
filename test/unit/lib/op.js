//imports
const suite = require("justo").suite;
const test = require("justo").test;
const cli = require("../../../dist/es5/nodejs/justo-plugin-cli/lib/op").default;

//suite
suite("#cli()", function() {
  test("cli({cmd, stdin})", function() {
    cli([{cmd: "node", stdin: "console.log(1+2)"}]).must.have({
      exitCode: 0,
      stdout: "3\n",
      stderr: ""
    });
  });

  test("cli(cmd, args:string[])", function() {
    cli([{cmd: "node", args: ["--eval", "console.log(1+2)"]}]).must.have({
      exitCode: 0,
      stdout: "3\n",
      stderr: ""
    });
  });

  test("cli({cmd, args:string})", function() {
    cli([{cmd: "node", args: "--help"}]).must.have({
      exitCode: 0,
      stderr: ""
    });
  });

  test("cli({cmd, arg})", function() {
    cli([{cmd: "node", arg: "--help"}]).must.have({
      exitCode: 0,
      stderr: ""
    });
  });

  test("cli({cmd, stdin})", function() {
    cli([{cmd: "node", stdin: "process.exit(1)"}]).must.have({
      exitCode: 1,
      stdout: "",
      stderr: ""
    });
  });

  test("cli({cmd, stdin}) - stdout and err returned", function() {
    cli([{cmd: "node", stdin: "console.log('Standard output'); console.error('Standard error output');"}]).must.have({
      exitCode: 0,
      stdout: "Standard output\n",
      stderr: "Standard error output\n"
    });
  });

  test("cli({cmd, stdin}) - without stdout nor stderr", function() {
    cli([{
      cmd: "node",
      stdin: "1+2"
    }]).must.have({
      exitCode: 0,
      stdout: "",
      stderr: ""
    });
  });

  test("cli({cmd}) - unknown command", function() {
    cli.must.raise(Error, [[{cmd: "unknown"}]]);
  });

  test("cli({cmd, output})", function() {
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

  test("cli({cmd, bg})", function() {
    cli([{
      cmd: "node",
      stdin: "1+2",
      bg: true
    }]).must.have({
      exitCode: undefined,
      stdout: null,
      stderr: null
    });
  });
})();
