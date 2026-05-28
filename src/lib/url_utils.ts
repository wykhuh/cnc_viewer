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
  if (appStore.page !== "home") return;

  let params = new URLSearchParams();

  if (appStore.project) {
    params.set("project_id", appStore.project.slug);
  }

  return params.toString();
}

export function updateAppUrl(url_location: Location, appStore: AppStoreType) {
  let url = `${url_location.origin}${url_location.pathname}`;
  let params = formatAppParams(appStore);
  if (params) {
    url += `?${params}`;
  }
}
