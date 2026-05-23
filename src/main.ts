import "./components/PageHome/component.ts";
import { getAndParseCSV } from "./lib/csv_utils.ts";
import type { Project, Taxon } from "./types/app";

let projects = (await getAndParseCSV(
  "/data/cnc_2026_projects.csv",
)) as Project[];
let taxa = (await getAndParseCSV("/data/cnc_2026_app_taxa.csv")) as Taxon[];

window.app = { data: { projects, taxa } };

const mainEl = document.querySelector("#app") as HTMLElement;
if (mainEl) {
  const pageElement = document.createElement("page-home");
  mainEl.appendChild(pageElement);
}
