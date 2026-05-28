import {
  selectRandomProject,
  selectProjectById,
} from "../components/PageHome/data_utils";
import { decodeAppUrl } from "./url_utils";
import { getAndParseCSV } from "./csv_utils.ts";
import type { AppPage, AppStoreType, Project } from "../types/app";

const pathPage = {
  "/about/": "about",
  "/": "home",
};

export function getAppPage(pathname: string) {
  return pathPage[pathname as keyof typeof pathPage] as AppPage;
}

export async function initApp(appStore: AppStoreType) {
  // save all projects to store
  let projects = (await getAndParseCSV(
    "/data/cnc_2026_projects_with_taxa.csv",
  )) as Project[];
  appStore.data.projects = projects;

  // save one project to store
  let urlData = decodeAppUrl(window.location.search);
  // if project_id is in the url, try to select project for id
  if (urlData.project_id) {
    let project = selectProjectById(urlData.project_id, appStore);
    if (!project) {
      project = selectRandomProject(appStore);
    }
    appStore.project = project;
    // else select random project
  } else {
    appStore.project = selectRandomProject(appStore);
  }

  // save page to store
  appStore.page = getAppPage(window.location.pathname);
}
