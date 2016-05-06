//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const pkg = require("../../dist/es5/nodejs/justo-plugin-cli");


//suite
suite("API", function() {
  test("default", function() {
    pkg.must.be.instanceOf(Function);
  });
})();
