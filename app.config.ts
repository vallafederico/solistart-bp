import { defineConfig } from "@solidjs/start/config";
import glsl from "vite-plugin-glsl";

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
];

export default defineConfig({
  vite: {
    plugins: plugins,
  },
});
