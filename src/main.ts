import "./components/PageHome/component.ts";
import "./components/SpeciesList/component.ts";

import { getAndParseCSV } from "./lib/csv_utils.ts";
import type { Project } from "./types/app";
import store from "./lib/store.ts";

let projects = (await getAndParseCSV(
  "/data/cnc_2026_projects_with_taxa.csv",
)) as Project[];

window.app = store;
store.data.projects = projects;

const mainEl = document.querySelector("#app") as HTMLElement;
if (mainEl) {
  const pageElement = document.createElement("page-home");
  mainEl.appendChild(pageElement);
}
