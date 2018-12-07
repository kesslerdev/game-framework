const glob = require("glob");
const path = require("path");
const rimraf = require("rimraf");

//Find watching directories
let pkgs = [];

require("../package.json").workspaces.forEach(dir => {
  pkgs = [...pkgs, ...glob.sync(path.join(path.dirname(__dirname), dir))];
});

pkgs.forEach(pkg => {
  rimraf.sync(path.join(pkg, "node_modules"));
  rimraf.sync(path.join(pkg, "dist"));
  rimraf.sync(path.join(pkg, "coverage"));
  console.log(`Cleaned ${pkg.replace(path.dirname(__dirname) + path.sep, "")}`);
});

rimraf.sync(path.join(path.dirname(__dirname), "node_modules"));
