import type { AppStoreType } from "../../types/app";

export function getTargetProjects(
  latitudeValue: number,
  appStore: AppStoreType,
) {
  return appStore.data.projects.filter((project) => {
    return Math.trunc(project.latitude) == latitudeValue;
  });
}
