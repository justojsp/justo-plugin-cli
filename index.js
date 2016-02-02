//imports
import {simple} from "justo";

//api
module.exports = simple({ns: "org.justojs.plugin", name: "cli"}, require("./lib/op").default);
