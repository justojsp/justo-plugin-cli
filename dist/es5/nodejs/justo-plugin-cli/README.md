[![Build Status](https://travis-ci.org/justojsp/justo-plugin-cli.svg)](https://travis-ci.org/justojsp/justo-plugin-cli)

Justo.js plugin to execute commands.

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

- `cmd` or ` command`. The command to execute.
- `args` or `arguments`. The arguments to pass.
- `wd` or `workingDir`. The working directory.
- `stdin`. The standard input.

The task returns an object:

- `stdout`. The standard output.
- `stderr`. The standard error.
- `exitCode`. The exit code.

Example:

```
if (cli("Transpile", {cmd: "babel"}).exitCode != 0) {
  //...
}
```
