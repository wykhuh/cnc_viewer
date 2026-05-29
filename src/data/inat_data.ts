export const iNatTaxaUrl = "https://www.inaturalist.org/taxa";
export const iNatPlacesUrl = "https://www.inaturalist.org/places";
export const iNatProjectsUrl = "https://www.inaturalist.org/projects";
export const iNatObservationsUrl = "https://www.inaturalist.org/observations";

export const CCLicenses = [
  "cc0",
  "cc-by",
  "cc-by-nc",
  "cc-by-sa",
  "cc-by-nd",
  "cc-by-nc-sa",
  "cc-by-nc-nd",
];

export const gbifObservationsCC = ["cc0", "cc-by", "cc-by-nc"];
export const wikimediaPhotosCC = ["cc0", "cc-by"];
export const siteCC = ["cc0", "cc-by", "cc-by-nc", "cc-by-sa", "cc-by-nc-sa"];

export const projectYearProjetCount = [
  { year: 2018, projects_count: 63 },
  { year: 2019, projects_count: 133 },
  { year: 2020, projects_count: 203 },
  { year: 2021, projects_count: 375 },
  { year: 2022, projects_count: 420 },
  { year: 2023, projects_count: 474 },
  { year: 2025, projects_count: 652 },
  { year: 2026, projects_count: 744 },
];

//forum.inaturalist.org/t/what-is-places-type-for-the-api-call-for-places-nearby/49446/2?u=wy_bio
export const placeTypes = {
  "0": "Undefined",
  "2": "Street Segment",
  "5": "Intersection",
  "6": "Street",
  "7": "Town",
  "8": "State",
  "9": "County",
  "10": "Local Administrative Area",
  "12": "Country",
  "13": "Island",
  "14": "Airport",
  "15": "Drainage",
  "16": "Land Feature",
  "17": "Miscellaneous",
  "18": "Nationality",
  "19": "Supername",
  "20": "Point of Interest",
  "21": "Region",
  "24": "Colloquial",
  "25": "Zone",
  "26": "Historical State",
  "27": "Historical County",
  "29": "Continent",
  "33": "Estate",
  "35": "Historical Town",
  "36": "Aggregate",
  "100": "Open Space",
  "101": "Territory",
  "102": "District",
  "103": "Province",
  "1000": "Municipality",
  "1001": "Parish",
  "1002": "Department Segment",
  "1003": "City Building",
  "1004": "Commune",
  "1005": "Governorate",
  "1006": "Prefecture",
  "1007": "Canton",
  "1008": "Republic",
  "1009": "Division",
  "1010": "Subdivision",
  "1011": "Village block",
  "1012": "Sum",
  "1013": "Unknown",
  "1014": "Shire",
  "1015": "Prefecture City",
  "1016": "Regency",
  "1017": "Constituency",
  "1018": "Local Authority",
  "1019": "Poblacion",
  "1020": "Delegation",
};

export type PlaceTypesKey = keyof typeof placeTypes;
