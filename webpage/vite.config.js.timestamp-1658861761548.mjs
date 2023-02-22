// webpage/vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
var __vite_injected_original_dirname = "/home/jjvv/Escritorio/webook/webpage";
var vite_config_default = defineConfig({
  base: "/notas-para-una-licenciatura/",
  plugins: [
    handlebars({
      partialDirectory: resolve(__vite_injected_original_dirname, "html")
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2VicGFnZS92aXRlLmNvbmZpZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2pqdnYvRXNjcml0b3Jpby93ZWJvb2svd2VicGFnZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvamp2di9Fc2NyaXRvcmlvL3dlYm9vay93ZWJwYWdlL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2pqdnYvRXNjcml0b3Jpby93ZWJvb2svd2VicGFnZS92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCBoYW5kbGViYXJzIGZyb20gXCJ2aXRlLXBsdWdpbi1oYW5kbGViYXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6IFwiL25vdGFzLXBhcmEtdW5hLWxpY2VuY2lhdHVyYS9cIixcbiAgcGx1Z2luczogW1xuICAgIGhhbmRsZWJhcnMoe1xuICAgICAgcGFydGlhbERpcmVjdG9yeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiaHRtbFwiKSxcbiAgICB9KSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4UixTQUFTLG9CQUFvQjtBQUMzVCxTQUFTLGVBQWU7QUFDeEIsT0FBTyxnQkFBZ0I7QUFGdkIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsV0FBVztBQUFBLE1BQ1Qsa0JBQWtCLFFBQVEsa0NBQVcsTUFBTTtBQUFBLElBQzdDLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
