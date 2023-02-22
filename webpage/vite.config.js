import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  base: "/notas-para-una-licenciatura/",
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "html"),
    }),
  ],
});
