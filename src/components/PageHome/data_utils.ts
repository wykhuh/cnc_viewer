import {
  observationPhotoResponse,
  observationPhotoResponse2,
  observationPhotoResponse3,
  observationSpecies,
} from "../../data/inat_api";
import { siteCC } from "../../data/inat_data";
import {
  getObservationsBasic,
  getObservationsSpeciesBasic,
} from "../../lib/inat_api";
import { sampleArray } from "../../lib/utils";
import type { AppStoreType, Project } from "../../types/app";
import type {
  BasicTaxon,
  iNatObservationsBasicAPI,
} from "../../types/inat_api";

export function getTargetProjects(
  latitudeValue: number,
  appStore: AppStoreType,
) {
  return appStore.data.projects.filter((project) => {
    return Math.trunc(project.latitude) == latitudeValue;
  });
}

const defaultParams = {
  license: siteCC.join(","),
  photos: true,
  verifiable: true,
  spam: false,
  // quality_grade: "research",
};

export async function fetchObservationBasicForTaxon(
  taxon: BasicTaxon,
  project: Project,
) {
  if (import.meta.env?.VITE_CACHE === "true") {
    let obs = sampleArray([
      observationPhotoResponse,
      observationPhotoResponse2,
      observationPhotoResponse3,
    ]);
    return obs.results;
  }

  let params = {
    ...defaultParams,
    taxon_id: taxon.id,
    project_id: project.id,
    per_page: 1,
    order_by: "random",
  };
  let paramsString = new URLSearchParams(params as any).toString();

  let data = (await getObservationsBasic(
    paramsString,
  )) as iNatObservationsBasicAPI;
  if (data && data.results.length > 0) {
    return data.results;
  }
}

export async function fetchSpecies(project: Project) {
  if (import.meta.env?.VITE_CACHE === "true") {
    return observationSpecies.results;
  }

  let params = {
    ...defaultParams,
    project_id: project.id,
    per_page: 10,
  };
  let paramsString = new URLSearchParams(params as any).toString();

  let data = await getObservationsSpeciesBasic(paramsString);
  if (data && data.results.length > 0) {
    return data.results;
  }
}
