import type { GeoJSON, Map } from "leaflet";

import type {
  BasicPhoto,
  CCLicense,
  MultiPolygonJson,
  PolygonJson,
} from "./inat_api";

declare global {
  interface Window {
    app: { store: AppStoreType; router: RouterType };
  }
}

export type AppStoreType = {
  data: { projects: Project[]; projectsForPlace: Project[] };
  speciesObservations: NormalizedSpeciesObservation[];
  selectedProject?: Project;
  animation: { looping: boolean };
  mode: ProjectMode;
  fullscreen: boolean;
  currentPage: AppPage;
  currentYear: number;
  map: Map | null;
  placesMapLayers?: GeoJSON;
  selectedPlaces?: NormalizedPlace;
};

export type AppPage = "home" | "about";
export type ProjectMode = "auto_change";

export type Taxon = {
  project_id: number;
  taxon_id: number;
  count: number;
  iconic_taxon_name: string;
  name: string;
  preferred_common_name: string;
  rank: string;
  photos: BasicPhoto[];
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  place_id: number;
  place_uuid: string;
  place_geometry?: PolygonJson | MultiPolygonJson;
  icon: string;
  species_count: number;
  place_display_name: string;
  latitude: number;
  longitude: number;
};

export interface ObservationTilesSettingType {
  name: string;
  type: "overlay" | "basemap";
  url: string;
  options: {
    attribution: string;
    minZoom: number;
    maxZoom: number;
    layer_description: string;
    layer_type: string;
    control_name?: string;
  };
}

export interface DataComponentType extends HTMLElement {
  data?: any;
  type?: string;
}

export type NormalizedSpeciesObservation = {
  id?: number;
  user?: { id: number; login: string };
  place_guess?: string;
  observed_on?: string;
  time_observed_at?: string;
  quality_grade?: string;
  license_code?: CCLicense | null;
  photos?: BasicPhoto[];
  count: number;
  taxon: BasicTaxon;
};

type Spinner = {
  start: () => void;
  stop: () => void;
};

export type ValidAppParams = {
  project_id?: string;
  place_id?: string;
};

type RouterType = {
  init: () => void;
  go: (path: string) => void;
};

export type NormalizedPlace = {
  display_name?: string;
  geometry?: PolygonJson | MultiPolygonJson;
  bounding_box?: PolygonJson;
  id: number;
  // place_type?: number;
  place_type_name?: string;
  // slug?: string;
};

export interface AutoCompleteEventType {
  detail: {
    query: string;
    selection: {
      index: number;
      match: string;
      value: NormalizedPlace;
    };
  };
}

interface LeafletOptions {
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
}

export interface GeoJSONSettings extends LeafletOptions {
  geometry: MultiPolygonJson | PolygonJson;
  interactive?: boolean;
}

export interface CircleSettings extends LeafletOptions {
  latitude: number;
  longitude: number;
  radius?: number;
}

export interface MarkerSettings {
  latitude: number;
  longitude: number;
}
