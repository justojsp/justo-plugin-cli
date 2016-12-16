[![NPM version](http://img.shields.io/npm/v/justo-plugin-cli.svg)](https://www.npmjs.org/package/justo-plugin-cli)
[![Build Status](https://travis-ci.org/justojsp/justo-plugin-cli.svg?branch=master)](https://travis-ci.org/justojsp/justo-plugin-cli)
[![Dependency Status](https://david-dm.org/justojsp/justo-plugin-cli.svg)](https://david-dm.org/justojsp/justo-plugin-cli)
[![devDependency Status](https://david-dm.org/justojsp/justo-plugin-cli/dev-status.svg)](https://david-dm.org/justojsp/justo-plugin-cli#info=devDependencies)

Simple task to execute commands.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install justo-plugin-cli
```

## Use

```
const cli = require("justo-plugin-cli");
```

To run a command, the task must be called as follows:

```
cli(justoOpts, opts : object) : object
```

The `opts` parameter:

- `cmd` (string). The command to execute.
- `arg` (string). The only argument.
- `args` (string or string[]). The arguments to pass.
- `wd` or `workDir` (string). The working directory.
- `stdin` (string). The standard input.
- `exitCode` (number). Exit code expected. Default: `0`.
  If `undefined`, the exit code is not kept in mind.
- `output` (boolean). Show the standard output? Default: `false`.
- `bg` (boolean). Run in background? Default: `false`.

When the task is executed in foreground, and waits for ending, returns an object
with the following properties:

- `stdout`. The standard output.
- `stderr`. The standard error.
- `exitCode`. The exit code.

Example:

```
//foreground: wait for ending
cli("Transpile", {
  cmd: /^win/.test(os.platform()) ? "babel.cmd" : "babel",
  args: [
    "--presets", "es2015",
    "--retain-lines",
    "--no-comments",
    "-d", "build/es5",
    "index.js",
    "lib/op.js"
  ]
});

//background: not wait for ending
cli("Start PouchDB Server", {
  cmd: /^win/.test(os.platform()) ? "pouchdb-server.cmd" : "pouchdb-server",
  args: ["-n", "-o", "localhost", "-p", 5985, "-m"],
  bg: true
});
```
