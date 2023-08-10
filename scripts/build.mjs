#!/usr/bin/env node
import esbuid from "esbuild"

console.time("build time")
await esbuid.build({
  entryPoints: ["src/main.ts", "src/server.ts"],
  outdir: "dist",
  platform: "node",
  bundle: true,
  external: ["sharp"],
})
console.timeEnd("build time")
