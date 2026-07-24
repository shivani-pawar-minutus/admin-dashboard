/// <reference types="node" />
import * as fs from "fs";
import * as path from "path";

import admins from "./src/data/admin.json";
import users from "./src/data/users.json";
// import roles from "./src/data/roles.json";
// import settings from "./src/data/settings.json";

const db = {
  admins,
  users,
  // roles,
  // settings,
};

const outputPath = path.join(process.cwd(), "src/data/db.json");

fs.writeFileSync(
  outputPath,
  JSON.stringify(db, null, 2),
  "utf-8"
);

console.log("✅ db.json generated successfully.");