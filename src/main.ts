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
