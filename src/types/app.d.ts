declare global {
  interface Window {
    app: AppStoreType;
  }
}

export type AppStoreType = {
  data: { taxa: Taxon[]; projects: Project[] };
};

export type Taxon = {
  project_id: number;
  taxon_id: number;
  count: number;
  iconic_taxon_name: string;
  name: string;
  preferred_common_name: string;
  rank: string;
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
