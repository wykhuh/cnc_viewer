import "./components/PageHome/component.ts";
import "./components/SpeciesList/component.ts";
import "./components/AppHeader/component.ts";
import "./components/PageAbout/component.ts";

import store from "./lib/store.ts";
import { initApp } from "./lib/init_app.ts";
import { updateAppUrl } from "./lib/url_utils.ts";
import Router from "./lib/router.ts";

window.app = { store: store, router: Router };

// populate app store
await initApp(window.app.store);
// load page component
Router.init();

updateAppUrl(window.location, window.app.store);

// TODO: allow users to set verifiable, quality_grade
// TODO: allow users to select projects by place
// TODO: add other years
// TODO: add badge for quality grade
