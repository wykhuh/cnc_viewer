import {
  selectRandomProject,
  selectProjectById,
} from "../components/PageHome/data_utils";
import { decodeAppUrl } from "./url_utils";
import { getAndParseCSV } from "./csv_utils.ts";
import type { AppStoreType, Project } from "../types/app";

export async function initApp(appStore: AppStoreType) {
  let projects = (await getAndParseCSV(
    "/data/cnc_2026_projects_with_taxa.csv",
  )) as Project[];
  appStore.data.projects = projects;

  let urlData = decodeAppUrl(window.location.search);

  if (urlData.project_id) {
    let project = selectProjectById(urlData.project_id, appStore);
    if (!project) {
      project = selectRandomProject(appStore);
    }
    appStore.project = project;
  } else {
    appStore.project = selectRandomProject(appStore);
  }
}
