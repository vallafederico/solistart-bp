import { defineConfig } from "@solidjs/start/config";
import solidSvg from "vite-plugin-solid-svg";
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
  solidSvg({
    defaultAsComponent: true,
  }),
];

export default defineConfig({
  server: {
    prerender: {
      routes: ["/"],
      // crawlLinks: true, /* prerenders all */
    },
  },
  vite: {
    plugins: plugins,
  },
});
