[![Build Status](https://travis-ci.org/justojsp/justo-plugin-cli.svg)](https://travis-ci.org/justojsp/justo-plugin-cli)

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
cli(opts, {cmd, args, wd, stdin}) : object
```

The parameters are:

- `cmd` or ` command` (string). The command to execute.
- `args` or `arguments` (string[]). The arguments to pass.
- `wd` or `workingDir` (string). The working directory.
- `stdin` (string). The standard input.
- `output` (boolean or string). Show the standard output: `true`, yep; `false`, nope. Default: `false`.

The task returns an object:

- `stdout`. The standard output.
- `stderr`. The standard error.
- `exitCode`. The exit code.

Example:

```
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
```
