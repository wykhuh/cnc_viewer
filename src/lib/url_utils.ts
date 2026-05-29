import type { AppStoreType, ValidAppParams } from "../types/app";

export function decodeAppUrl(searchParams: string) {
  const urlParams = new URLSearchParams(searchParams);
  let params: ValidAppParams = {};

  let project_id = urlParams.get("project_id");
  if (project_id) {
    params.project_id = project_id;
  }
  return params;
}

export function formatAppParams(appStore: AppStoreType) {
  if (appStore.currentPage !== "home") return;

  let params = new URLSearchParams();

  if (appStore.selectedProject) {
    params.set("project_id", appStore.selectedProject.slug);
  }

  return params.toString();
}

export function updateAppUrl(url_location: Location, appStore: AppStoreType) {
  let url = `${url_location.origin}${url_location.pathname}`;
  let params = formatAppParams(appStore);
  if (params) {
    url += `?${params}`;
  }
  updatePushState(url_location.pathname, url, appStore);
}

export function updatePushState(
  pathname: string,
  url: string,
  appStore: AppStoreType,
) {
  let state = {
    pathname,
    project_id: appStore.selectedProject?.id,
  };
  window.history.pushState(state, "", url);
}
