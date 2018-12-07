const nodemon = require("nodemon");
const path = require("path");
const glob = require("glob");

const rootRelative = path.relative(process.cwd(), path.dirname(__dirname));

//Find watching directories
let watches = [];

require("../package.json").workspaces.forEach(dir => {
  watches = [...watches, ...glob.sync(path.join(rootRelative, dir))];
});

watches = watches.map(w => `-w ${w}`);

// STARTING nodemon
nodemon(`--delay 1 ${watches.join(" ")} ${process.argv.slice(2).join(" ")}`);

nodemon
  .on("start", function() {
    console.log("App has started");
  })
  .on("quit", function() {
    console.log("App has quit");
    process.exit();
  })
  .on("restart", function(files) {
    console.log("App restarted due to: ", files);
  });
