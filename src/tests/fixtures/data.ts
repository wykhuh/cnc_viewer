import type { NormalizedPlace, Project } from "../../types/app";

export const projectDemo: Project = {
  id: 1,
  title: "project 1",
  slug: "project-1",
  place_id: 10,
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
