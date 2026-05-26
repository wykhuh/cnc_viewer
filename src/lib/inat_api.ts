import type {
  iNatObservationsBasicAPI,
  iNatObservationsSpeciesBasicAPI,
} from "../types/inat_api.d.ts";
import { loggerUrl } from "./logger.ts";

export const api_base = "https://api.inaturalist.org/v1/";
const search_api = "https://api.inaturalist.org/v1/search";
export const autocomplete_places_api = `${search_api}?sources=places`;
export const autocomplete_projects_api = `https://api.inaturalist.org/v1/projects/autocomplete?`;
export const autocomplete_users_api = `https://api.inaturalist.org/v1/users/autocomplete?order=activity`;
export const autocomplete_taxa_api =
  "https://api.inaturalist.org/v1/taxa/autocomplete?";
export const autocomplete_observation_fields_api = `https://api.inaturalist.org/v1/observation_fields/autocomplete?`;
const observations_api_v2 = "https://api.inaturalist.org/v2/observations";

export async function inatFetch(url: string, funcName: string) {
  try {
    let resp = await fetch(url);
    if (resp.status !== 200) {
      let json = await resp.json();
      let message = "";
      if (json.errors) {
        message = json.errors[0].message;
      } else {
        message = json.error;
      }
      console.error(message);
    }

    let data = await resp.json();
    return data;
  } catch (error) {
    console.error(`${funcName} ERROR: ${error}`);
  }
}

export async function getObservationsBasic(appParams: string) {
  const fields =
    "(id:!t," +
    "user:(login:!t)," +
    "place_guess:!t," +
    "observed_on:!t," +
    "time_observed_at:!t," +
    "quality_grade:!t," +
    "license_code:!t," +
    "taxon:(name:!t,preferred_common_name:!t,rank:!t)," +
    "photos:(id:!t,url:!t,attribution:!t,license_code:!t))";
  let url = `${observations_api_v2}?${appParams}` + `&fields=${fields}`;
  let data = (await inatFetch(
    url,
    "getObservationPhoto",
  )) as iNatObservationsBasicAPI;
  if (data) {
    loggerUrl(url.split("&fields")[0] + "&fields...", data.total_results);
    return data;
  }
}

export async function getObservationsSpeciesBasic(appParams: string) {
  let fields =
    "(taxon:" +
    "(" +
    "id:!t," +
    "name:!t," +
    "preferred_common_name:!t," +
    "rank:!t))";
  let url =
    `${observations_api_v2}/species_counts?${appParams}&ttl=3600` +
    `&fields=${fields}`;
  let data = (await inatFetch(
    url,
    "getObservationsSpeciesBasic",
  )) as iNatObservationsSpeciesBasicAPI;
  if (data) {
    loggerUrl(url.split("&fields")[0] + "&fields...", data.total_results);
    return data;
  }
}

export async function getAutocompletePlaces(query: string) {
  let url = `${autocomplete_places_api}&per_page=50&q=${query}`;
  let data = await inatFetch(url, "getAutocompletePlaces");
  if (data) {
    loggerUrl(url, data.total_results);
    return data;
  }
}

export async function getAutocompleteProjects(query: string) {
  let url = `${autocomplete_projects_api}&per_page=50&q=${query}`;
  let data = await inatFetch(url, "getAutocompleteProjects");
  if (data) {
    loggerUrl(url, data.total_results);
    return data;
  }
}
