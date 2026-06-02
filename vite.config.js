import { defineConfig } from "vite";
import { markdownToHtml } from "./plugins/markdown";

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        service_worker: "service_worker.js",
        service_worker_utils: "service_worker_utils.js",
      },
      output: {
        entryFileNames: (assetInfo) => {
          console.log(assetInfo.name);
          if (assetInfo.name === "service_worker") {
            return "service_worker.js";
          } else if (assetInfo.name === "service_worker_utils") {
            return "service_worker_utils.js";
          } else {
            return "assets/[name]-[hash].js";
          }
        },
      },
    },
  },
  plugins: [markdownToHtml()],
});
