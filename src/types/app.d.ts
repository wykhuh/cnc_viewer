import type { BasicPhoto, CCLicense } from "./inat_api";

declare global {
  interface Window {
    app: AppStoreType;
  }
}

export type AppStoreType = {
  data: { projects: Project[] };
  speciesObservations: NormalizedSpeciesObservation[];
  project?: Project;
  animation: { looping: boolean };
  mode: ProjectMode;
  fullscreen: boolean;
};

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
  icon: string;
  species_count: number;
  place_name: string;
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
