import {
  selectRandomProject,
  selectProjectById,
  loadProjectsCsv,
} from "../components/PageHome/data_utils";
import { decodeAppUrl } from "./url_utils";
import type { AppPage, AppStoreType } from "../types/app";

const pathPage = {
  "/about/": "about",
  "/": "home",
};

export function getAppPage(pathname: string) {
  return pathPage[pathname as keyof typeof pathPage] as AppPage;
}

export async function initApp(appStore: AppStoreType) {
  // save all projects to store
  await loadProjectsCsv(appStore.currentYear, appStore);

  // save one project to store
  let urlData = decodeAppUrl(window.location.search);
  // if project_id is in the url, try to select project for id
  if (urlData.project_id) {
    let project = selectProjectById(urlData.project_id, appStore);
    if (!project) {
      project = selectRandomProject(appStore);
    }
    appStore.selectedProject = project;
    // else select random project
  } else {
    appStore.selectedProject = selectRandomProject(appStore);
  }

  // save page to store
  appStore.currentPage = getAppPage(window.location.pathname);
}
