import type { ValidAppParams } from "../types/app";

export function decodeAppUrl(searchParams: string) {
  const urlParams = new URLSearchParams(searchParams);
  let params: ValidAppParams = {};

  let project_id = urlParams.get("project_id");
  if (project_id) {
    params.project_id = project_id;
  }
  return params;
}

