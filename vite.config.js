import { defineConfig } from "vite";
import { markdownToHtml } from "./plugins/markdown";

export default defineConfig({
  plugins: [markdownToHtml()],
});
