//imports
const catalog = require("justo").catalog;
const simple = require("justo").simple;
const fs = require("justo-fs");
const babel = require("justo-plugin-babel");
const clean = require("justo-plugin-fs").clean;
const copy = require("justo-plugin-fs").copy;
const jshint = require("justo-plugin-jshint");
const publish = require("justo-plugin-npm").publish;

//works
catalog.workflow({name: "build", desc: "Build the package."}, function() {
  clean("Clean build directory", {
    dirs: ["build/es5"]
  });

  jshint("Best practices", {
    output: true,
    files: [
      "index.js",
      "lib/op.js"
    ]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    files: {
      "build/es5/index.js": "index.js",
      "build/es5/lib/op.js": "lib/op.js"
    }
  });

  clean("Clean dist directory", {
    dirs: ["dist/es5"]
  });

  copy(
    "Create package",
    {
      src: "build/es5/index.js",
      dst: "dist/es5/nodejs/justo-plugin-cli/"
    },
    {
      src: "build/es5/lib/",
      dst: "dist/es5/nodejs/justo-plugin-cli/lib"
    },
    {
      src: ["package.json", "README.md"],
      dst: "dist/es5/nodejs/justo-plugin-cli"
    }
  );
});

catalog.macro({name: "test", desc: "Unit test."}, {
  require: "justo-assert",
  src: [
    "test/unit/index.js",
    "test/unit/lib/"
  ]
});

catalog.workflow({name: "publish", desc: "NPM publish."}, function() {
  publish("Publish in NPM", {
    who: "justojs",
    src: "dist/es5/nodejs/justo-plugin-jshint"
  });
});

catalog.macro("default", ["build", "test"]);
