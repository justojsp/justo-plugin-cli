//imports
const plugin = require("../../../dist/es5/nodejs/justo-plugin-cli");
const CliTask = plugin.CliTask;
const PluginError = plugin.PluginError;

//suite
describe("CliTask", function() {
  describe("#constructor()", function() {
    it("constructor()", function() {
      var task = new CliTask();

      task.must.have({
        namespace: "org.justojs",
        _parent: undefined,
        name: "cli",
        title: "cli",
        description: "Task for executing commands."
      });
      task.qn.must.be.eq("org.justojs.cli");
      task.fn.must.be.instanceOf(Function);
    });
  });

  describe("Function task", function() {
    var task, cli;

    before(function() {
      task = new CliTask();
      cli = task.fn;
    });

    it("Run command with input", function() {
      cli({
        command: "node",
        stdin: "console.log(1+2)",
        stdout: "3\n",
        exitCode: 0
      });
    });

    it("Run command with arguments", function() {
      cli({
        command: "node",
        arguments: ["--eval", "console.log(1+2)"],
        stdout: "3\n",
        exitCode: 0
      });
    });

    it("Run command with output expected - pass", function() {
      cli({
        command: "node",
        stdin: "console.log('Standard output'); console.error('Standard error output');",
        stdout: "Standard output\n",
        stderr: "Standard error output\n"
      });
    });

    it("Run command with output expected - fail", function() {
      (function() {
        cli({
          command: "node",
          stdin: "console.log('Standard output'); console.error('Standard error output')",
          stdout: "",
          stderr: ""
        });
      }).must.raise(PluginError);
    });

    it("Run command with exit code expected - pass", function() {
      cli({
        command: "node",
        stdin: "process.exit(0)",
        exitCode: 0
      });
    });

    it("Run command with exit code expected - fail", function() {
      (function() {
        cli({
          command: "node",
          stdin: "process.exit(1)",
          exitCode: 0
        });
      }).must.raise(PluginError);
    });
  });
});
