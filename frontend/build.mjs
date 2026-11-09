import { build } from "esbuild";

await build({
  entryPoints: ["src/index.ts"],
  outfile: "../custom_components/piyolog/frontend/piyolog-card.js",
  bundle: true,
  format: "esm",
  target: "es2021",
  minify: true,
  legalComments: "none",
  logLevel: "info",
});
