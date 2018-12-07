const meta = require("quarkit-metadata");
const stampit = require("@stamp/it");
const yaml = require("js-yaml");
const core = require("quarkit-core");
const modules = require("quarkit-modules");
const { omit, pick } = require("lodash");
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const quarks = {
  ...omit(core, ["interopMethodTypes", "cleanName"]),
  ...modules
};

const docs = Object.keys(quarks).reduce((acc, k) => {
  const parent = stampit().compose(
    ...Object.values(
      pick(quarks, quarks[k].quarks.filter(q => q !== quarks[k].quark))
    )
  );
  return {
    ...acc,
    [k]: meta.quarkitDiffMetadata(quarks[k], parent)
  };
}, {});

const path = join(__dirname, "..", "docs.src", "mkdocs.yml");
const conf = yaml.safeLoad(readFileSync(path));

writeFileSync(
  path,
  yaml.safeDump(
    {
      ...conf,
      extra: {
        ...conf.extra,
        quarks: docs
      }
    },
    {
      skipInvalid: true
    }
  )
);
