// ==================
// obseservations
// ==================

type iNatObservationsBasicAPI = {
  total_results: number;
  page: number;
  per_page: number;
  results: ObservationsBasicResult[];
};

export type ObservationsBasicResult = {
  uuid: string;
  id: number;
  user: { id: number; login: string };
  place_guess: string;
  observed_on: string;
  time_observed_at: string;
  quality_grade: string;
  license_code: CCLicense;
  photos: BasicPhoto[];
  taxon: BasicTaxon;
};

export type BasicTaxon = {
  id: number;
  name: string;
  preferred_common_name?: string;
  rank: string;
  default_photo?: BasicPhoto;
};

export type BasicPhoto = {
  id: number;
  url: string;
  attribution: string;
  license_code: CCLicense | null;
};

export type iNatObservationsSpeciesBasicAPI = {
  total_results: number;
  page: number;
  per_page: number;
  results: ObservationsSpeciesBasicResult[];
};

export type ObservationsSpeciesBasicResult = {
  count: number;
  taxon: BasicTaxon;
};

// ==================
// search api
// ==================

export interface iNatSearchAPI {
  total_results: number;
  page: number;
  per_page: number;
  results: SearchResult[];
}

export interface SearchResult {
  matches: string[];
  record: SearchRecord;
  score: number;
  type: string;
}

export interface SearchRecord {
  admin_level: number | null;
  ancestor_place_ids: number[] | null;
  bbox_area: number;
  bounding_box_geojson: PolygonJson;
  display_name_autocomplete: string;
  display_name: string;
  geometry_geojson: MultiPolygonJson | PolygonJson;
  id: number;
  location: string;
  matched_term: string;
  name: string;
  names: string[];
  observations_count: number;
  place_type: number | null;
  point_geojson: Point;
  slug: string;
  universal_search_rank: number;
  user: UserBasic | null;
  uuid: string;
  without_check_list: boolean | null;
}

export interface UserBasic {
  created_at: string;
  id: number;
  login: string;
  spam: boolean;
  suspended: boolean;
}

interface MultiPolygonJson {
  type: "MultiPolygon";
  coordinates: LngLat[][][];
}

export interface PolygonJson {
  type: "Polygon";
  coordinates: LngLat[][];
}

interface Point {
  type: "Point";
  coordinates: LngLat;
}

export interface Geojson {
  type: string;
  coordinates: number[][][];
}

// ==================
// place api
// ==================

export type iNatPlacesAPI = {
  total_results: number;
  page: number;
  per_page: number;
  results: PlaceResult[];
};

type PlaceResult = {
  id: number;
  bounding_box_geojson: PolygonJson;
  display_name: string;
  geometry_geojson: MultiPolygonJson | PolygonJson;
  name: string;
  place_type: number;
};
