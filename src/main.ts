import "./components/PageHome/component.ts";
import "./components/SpeciesList/component.ts";

import store from "./lib/store.ts";
import { initApp } from "./lib/init_app.ts";
import { updateAppUrl } from "./lib/url_utils.ts";

window.app = store;
await initApp(window.app);
updateAppUrl(window.location, window.app);

const mainEl = document.querySelector("#app") as HTMLElement;
if (mainEl) {
  const pageElement = document.createElement("page-home");
  mainEl.appendChild(pageElement);
}

// TODO: allow users to set verifiable, quality_grade
// TODO: allow users to select projects by place
// TODO: add other years
// TODO: add badge for quality grade
