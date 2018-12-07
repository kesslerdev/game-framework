const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const glob = require("glob");
const { spawn } = require("child_process");

shell = function(cmd, args, options, callback) {
  var p;
  process.stdin.pause();
  process.stdin.setRawMode(false);

  p = spawn(cmd, args, {
    ...options,
    stdio: [0, 1, 2]
  });

  return p.on("exit", function() {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    return callback();
  });
};

//Find watching directories
let pkgs = [];

require("../package.json").workspaces.forEach(dir => {
  pkgs = [...pkgs, ...glob.sync(path.join(path.dirname(__dirname), dir))];
});

const next = i => {
  if (i == pkgs.length) process.exit(0);

  const pkg = pkgs[i];
  if (fs.existsSync(path.join(pkg, ".yo-rc.json"))) {
    const conf = require(path.join(pkg, "package.json"));
    const bar = chalk.gray("=".repeat(process.stdout.columns / 6));
    console.log(
      `${bar} ${chalk.blue(conf.name)} - v${chalk.green(conf.version)} ${bar}`
    );
    const cp = shell(
      "node",
      [yo, "skimia", "--no-prompt"],
      { cwd: pkg },
      () => {
        next(i + 1);
      }
    );
  } else next(i + 1);
};
const yo = path.join(path.dirname(__dirname), "node_modules/.bin/yo");

next(0);
