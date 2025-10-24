import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const enableFileWrite = process.argv[2];
// __dirname workaround in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROUTES_DIR = path.join(__dirname, "backend/routes");
const OUTPUT_FILE = path.join(__dirname, "routes-summary.txt");

const methods = ["get", "post", "put", "delete", "patch"];
const routeRegex = new RegExp(
  `router\\.(${methods.join("|")})\\(['"\`]([^'"\\\`]+)['"\`]`,
  "i"
);

const files = fs.readdirSync(ROUTES_DIR).filter((f) => f.endsWith(".route.js"));

let result = [];
let data = [];

for (const file of files) {
  const prefix = "/" + file.replace(".route.js", "");
  const lines = fs
    .readFileSync(path.join(ROUTES_DIR, file), "utf-8")
    .split("\n");

  const routes = lines
    .map((line) => line.trim())
    .map((line) => {
      const match = routeRegex.exec(line);
      if (!match) return null;
      const method = match[1].toUpperCase();
      const subPath = match[2].startsWith("/") ? match[2] : "/" + match[2];
      return `${method} ${prefix}${subPath}`;
    })
    .filter(Boolean);
  if (routes.length) {
    result.push(`${file}`);
    result.push(...routes);
    data.push({ file: `${file}`, routes: { ...routes } });
    result.push(""); // Empty line for separation
  }
}

export const getExtractedRoutes = () => data

if (enableFileWrite == 1) {
  fs.writeFileSync(OUTPUT_FILE, result.join("\n"), "utf-8");
  logger("log",`Extracted ${result.length} lines to ${OUTPUT_FILE}`);
}
