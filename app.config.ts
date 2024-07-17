import { defineConfig } from "@solidjs/start/config";
import glsl from "vite-plugin-glsl";
// import FullReload from "vite-plugin-full-reload";

const plugins = [
  glsl({
    include: ["**/*.glsl", "**/*.vert", "**/*.frag"],
    exclude: undefined,
    warnDuplicatedImports: true,
    defaultExtension: "glsl",
    compress: false,
    watch: true,
    root: "/",
  }),
  // FullReload(["src/"]),
];

export default defineConfig({
  vite: {
    plugins: plugins,
  },
});
