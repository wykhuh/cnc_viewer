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
  preferred_common_name: string;
  rank: string;
};

export type BasicPhoto = {
  id: number;
  url: string;
  attribution: string;
  license_code: CCLicense;
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
