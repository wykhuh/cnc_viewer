import { multiPolygon, points, polygon } from "@turf/helpers";
import {
  observationPhotoResponse,
  observationPhotoResponse2,
  observationPhotoResponse3,
  observationSpecies,
} from "../../data/inat_api";
import { placeTypes, type PlaceTypesKey } from "../../data/inat_data";
import { getAndParseCSV } from "../../lib/csv_utils";
import {
  getObservationsBasic,
  getObservationsSpeciesBasic,
} from "../../lib/inat_api";
import { sampleArray } from "../../lib/utils";
import type { AppStoreType, NormalizedPlace, Project } from "../../types/app";
import type {
  BasicTaxon,
  iNatObservationsBasicAPI,
  PlaceResult,
  SearchRecord,
} from "../../types/inat_api";
import pointsWithinPolygon from "@turf/points-within-polygon";

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
  if (appStore.selectedPlaces?.id) {
    return sampleArray(appStore.data.projectsForPlace);
  } else {
    return sampleArray(appStore.data.projects);
    // return appStore.data.projects.filter((p) => p.id == 266374)[0];
  }
  // 279618 - 8 species all rights reserved by two observers
  // 279847 - 3 species are all rights reserved by the same observer
  // 270080 - 3 species only have 1 all rights obs
  // 264323 - 1 species common hackberry have CC and all rights observations
  // 266374 - painted turtle, observation ok, photo ND
  // 242086 - 7 species all rights reserved by one observer
}

export function selectProjectById(id: number | string, appStore: AppStoreType) {
  if (appStore.selectedPlaces?.id) {
    return appStore.data.projectsForPlace.find(
      (p) => p.slug === id || p.id === Number(id),
    );
  } else {
    return appStore.data.projects.find(
      (p) => p.slug === id || p.id === Number(id),
    );
  }
}

export async function loadProjectsCsv(year = 2026, appStore: AppStoreType) {
  let projects = (await getAndParseCSV(
    `/data/cnc_${year}_projects_app.csv`,
  )) as Project[];

  appStore.data.projects = cleanupProjectsCSV(projects);
}

export function cleanupProjectsCSV(projects: any[]): Project[] {
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

export function normalizePlaceResult(record: SearchRecord | PlaceResult) {
  let typeName;
  if (record.place_type) {
    typeName = placeTypes[record.place_type.toString() as PlaceTypesKey];
  }
  return {
    display_name: record.display_name,
    geometry: record.geometry_geojson as any,
    bounding_box: record.bounding_box_geojson,
    id: record.id,
    place_type_name: typeName,
  };
}

// add projects within place to store
export function projectsWithinPlaceHandler(
  place: NormalizedPlace,
  appStore: AppStoreType,
) {
  let placeGeometry = place.geometry;

  if (!placeGeometry) {
    return;
  }

  // convert project lat long into points
  let projectsLongLat = appStore.data.projects
    .filter((p) => p.latitude !== undefined)
    .map((p) => [p.longitude, p.latitude]);
  let projectPoints = points(projectsLongLat);

  // convert project geometry into polygons
  let placePolygon;
  if (placeGeometry.type === "MultiPolygon") {
    placePolygon = multiPolygon(placeGeometry.coordinates);
  } else {
    placePolygon = polygon(placeGeometry.coordinates);
  }

  // look for project points within place polygon
  // @ts-ignore
  let withinResults = pointsWithinPolygon(projectPoints, placePolygon);

  // find projects for within points
  let targetProjects: Project[] = [];
  withinResults.features.forEach((feature) => {
    appStore.data.projects
      .filter(
        (p) =>
          p.longitude === feature.geometry.coordinates[0] &&
          p.latitude === feature.geometry.coordinates[1],
      )
      .forEach((p) => targetProjects.push(p));
  });

  if (targetProjects.length > 0) {
    // save projects to store
    appStore.data.projectsForPlace = targetProjects;
  }
}
