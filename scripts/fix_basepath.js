const fs = require("fs");
const path = require("path");

const BASE_PATH = process.env.BASE_PATH || "/Teddy";
const OUT_DIR = path.resolve(__dirname, "..", "out");

if (!fs.existsSync(OUT_DIR)) {
  console.error("out/ directory not found");
  process.exit(1);
}

let filesUpdated = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (/\.(html|js|css|json)$/i.test(entry.name)) {
      let content = fs.readFileSync(full, "utf8");
      const original = content;

      const bpClean = BASE_PATH.replace(/^\//, "");
      const reQuotes = new RegExp(`(["'\`(])\\/(?!${bpClean}\\/)(media|brand|cursor)\\/`, "g");
      content = content.replace(reQuotes, `$1${BASE_PATH}/$2/`);

      if (content !== original) {
        fs.writeFileSync(full, content, "utf8");
        filesUpdated++;
      }
    }
  }
}

walk(OUT_DIR);
fs.writeFileSync(path.join(OUT_DIR, ".nojekyll"), "");
console.log(`Updated asset basePath (${BASE_PATH}) in ${filesUpdated} files + added .nojekyll`);
