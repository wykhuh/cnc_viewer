import {
  observationPhotoResponse,
  observationPhotoResponse2,
  observationPhotoResponse3,
  observationSpecies,
} from "../../data/inat_api";
import { getAndParseCSV } from "../../lib/csv_utils";
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

  // fetch multiple observations in hopes that one of the observations will have
  // allowed site CC license, and show different random observations
  let params = {
    ...defaultParams,
    taxon_id: taxon.id,
    project_id: project.id,
    per_page: 10,
    order_by: "random",
    photos: true,
    // license: siteCC.join(","),
    // photo_license: siteCC.join(","),
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

export function selectRandomProject(appStore: AppStoreType) {
  let randomProject = sampleArray(appStore.data.projects);
  // 279618 - 8 species all rights reserved by two observers
  // 279847 - 3 species are all rights reserved by the same observer
  // 270080 - 3 species only have 1 all rights obs
  // 264323 - 1 species common hackberry have CC and all rights observations
  // 266374 - painted turtle, observation ok, photo ND
  // 242086 - 7 species all rights reserved by one observer
  // randomProject = appStore.data.projects.filter((p) => p.id == 266374)[0];

  return randomProject;
}

export function selectProjectById(id: number | string, appStore: AppStoreType) {
  return appStore.data.projects.find((p) => p.slug === id || p.id === id);
}

export async function loadProjectsCsv(year = 2026, appStore: AppStoreType) {
  let projects = (await getAndParseCSV(
    `/data/cnc_${year}_projects_app.csv`,
  )) as Project[];

  appStore.data.projects = cleanupProjectsCSV(projects);
}

export function cleanupProjectsCSV(projects: Project[]) {
  return projects
    .filter((p) => p.title !== undefined)
    .map((project) => {
      return {
        ...project,
        id: Number(project.id),
        latitude: Number(project.latitude),
        longitude: Number(project.longitude),
        place_id: Number(project.place_id),
        species_count: Number(project.species_count),
      };
    });
}
