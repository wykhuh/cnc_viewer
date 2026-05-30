import type { NormalizedPlace, Project } from "../../types/app";
import type { iNatPlacesAPI } from "../../types/inat_api";

export const projectsDemo = [
  {
    id: "1",
    title: "CNC Boston 2026",
    slug: "boston-cnc",
    place_id: "101",
    place_uuid: "101abc",
    icon: "boston.png",
    place_display_name: "Boston, MA",
    latitude: "42.3426200635",
    longitude: "-70.7675275496",
    species_count: "1300",
  },
  {
    id: "2",
    title: "CNC London 2026",
    slug: "london-cnc",
    place_id: "102",
    place_uuid: "102abc",
    icon: "london.png",
    place_display_name: "London, UK",
    latitude: "51.4859381197",
    longitude: "-0.1259994507",
    species_count: "700",
  },
  {
    id: "3",
    title: "CNC Los Angeles 2026",
    slug: "los-angeles-cnc",
    place_id: "103",
    place_uuid: "103abc",
    icon: "los-angeles.png",
    place_display_name: "Los Angeles, CA",
    latitude: "34.1980014782",
    longitude: "-118.2610169697",
    species_count: "2500",
  },
  {
    id: "4",
    title: "CNC San Francisco 2026",
    slug: "san-francisco-cnc",
    place_id: "104",
    place_uuid: "104abc",
    icon: "san-francisco.png",
    place_display_name: "San Francisco, CA",
    latitude: "37.8786225",
    longitude: "-122.4203475",
    species_count: "3200",
  },
];

export const projectsDemoCleaned: Project[] = [
  {
    id: 1,
    title: "CNC Boston 2026",
    slug: "boston-cnc",
    place_id: 101,
    place_uuid: "101abc",
    icon: "boston.png",
    place_display_name: "Boston, MA",
    latitude: 42.3426200635,
    longitude: -70.7675275496,
    species_count: 1300,
  },
  {
    id: 2,
    title: "CNC London 2026",
    slug: "london-cnc",
    place_id: 102,
    place_uuid: "102abc",
    icon: "london.png",
    place_display_name: "London, UK",
    latitude: 51.4859381197,
    longitude: -0.1259994507,
    species_count: 700,
  },
  {
    id: 3,
    title: "CNC Los Angeles 2026",
    slug: "los-angeles-cnc",
    place_id: 103,
    place_uuid: "103abc",
    icon: "los-angeles.png",
    place_display_name: "Los Angeles, CA",
    latitude: 34.1980014782,
    longitude: -118.2610169697,
    species_count: 2500,
  },
  {
    id: 4,
    title: "CNC San Francisco 2026",
    slug: "san-francisco-cnc",
    place_id: 104,
    place_uuid: "104abc",
    icon: "san-francisco.png",
    place_display_name: "San Francisco, CA",
    latitude: 37.8786225,
    longitude: -122.4203475,
    species_count: 3200,
  },
];

export const projectDemo: Project = {
  id: 1,
  title: "project 1",
  slug: "project-1",
  place_id: 10,
  place_uuid: "10abc",
  icon: "project.png",
  species_count: 100,
  place_display_name: "Place ",
  latitude: 90,
  longitude: 100,
};

export const placeDemo: NormalizedPlace = {
  id: 1,
  display_name: "city, state",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-124.482003, 32.528832],
        [-124.482003, 42.009517],
        [-114.131211, 42.009517],
        [-114.131211, 32.528832],
        [-124.482003, 32.528832],
      ],
    ],
  },
  bounding_box: { type: "Polygon", coordinates: [] },
  place_type_name: "Town",
};

export const placesAPIResponse: iNatPlacesAPI = {
  total_results: 1,
  page: 1,
  per_page: 30,
  results: [
    {
      id: 1,
      display_name: "city, state",
      name: "city",
      geometry_geojson: {
        type: "Polygon",
        coordinates: [
          [
            [-124.482003, 32.528832],
            [-124.482003, 42.009517],
            [-114.131211, 42.009517],
            [-114.131211, 32.528832],
            [-124.482003, 32.528832],
          ],
        ],
      },
      bounding_box_geojson: { type: "Polygon", coordinates: [] },
      place_type: 7,
    },
  ],
};
