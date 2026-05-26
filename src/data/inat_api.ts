import type {
  iNatObservationsBasicAPI,
  iNatObservationsSpeciesBasicAPI,
} from "../types/inat_api";

export const observationSpecies: iNatObservationsSpeciesBasicAPI = {
  total_results: 671,
  page: 1,
  per_page: 10,
  results: [
    {
      count: 87,
      taxon: {
        id: 13695,
        name: "Motacilla alba",
        preferred_common_name: "White Wagtail",
        rank: "species",
      },
    },
    {
      count: 87,
      taxon: {
        id: 950603,
        name: "Anemonoides nemorosa",
        preferred_common_name: "wood anemone",
        rank: "species",
      },
    },
    {
      count: 85,
      taxon: {
        id: 144510,
        name: "Chroicocephalus ridibundus",
        preferred_common_name: "Black-headed Gull",
        rank: "species",
      },
    },
    {
      count: 77,
      taxon: {
        id: 10070,
        name: "Fringilla coelebs",
        preferred_common_name: "Common Chaffinch",
        rank: "species",
      },
    },
    {
      count: 65,
      taxon: {
        id: 7046,
        name: "Aythya fuligula",
        preferred_common_name: "Tufted Duck",
        rank: "species",
      },
    },
    {
      count: 61,
      taxon: {
        id: 12716,
        name: "Turdus merula",
        preferred_common_name: "Eurasian Blackbird",
        rank: "species",
      },
    },
    {
      count: 59,
      taxon: {
        id: 47602,
        name: "Taraxacum officinale",
        preferred_common_name: "common dandelion",
        rank: "species",
      },
    },
    {
      count: 56,
      taxon: {
        id: 12707,
        name: "Turdus pilaris",
        preferred_common_name: "Fieldfare",
        rank: "species",
      },
    },
    {
      count: 56,
      taxon: {
        id: 51741,
        name: "Aegopodium podagraria",
        preferred_common_name: "Goutweed",
        rank: "species",
      },
    },
    {
      count: 54,
      taxon: {
        id: 6930,
        name: "Anas platyrhynchos",
        preferred_common_name: "Mallard",
        rank: "species",
      },
    },
  ],
};

export const observationPhotoResponse: iNatObservationsBasicAPI = {
  total_results: 83,
  page: 1,
  per_page: 1,
  results: [
    {
      uuid: "6eabf3ff-d2fb-4f36-a1d2-0f3dd1755008",
      id: 358005200,
      user: {
        id: 6570104,
        login: "krasnoperovsn",
      },
      place_guess: "Большая Ижора, Ленинградская обл., Россия",
      observed_on: "2026-04-25",
      time_observed_at: "2026-04-25T05:41:00+03:00",
      quality_grade: "research",
      license_code: "cc-by-nc",
      taxon: {
        id: 13695,
        name: "Motacilla alba",
        preferred_common_name: "White Wagtail",
        rank: "species",
      },
      photos: [
        {
          id: 653014317,
          url: "https://inaturalist-open-data.s3.amazonaws.com/photos/653014317/square.jpg",
          attribution:
            "(c) Сергей Красноперов, some rights reserved (CC BY-NC)",
          license_code: "cc-by-nc",
        },
      ],
    },
  ],
};

export const observationPhotoResponse2: iNatObservationsBasicAPI = {
  total_results: 83,
  page: 1,
  per_page: 1,
  results: [
    {
      uuid: "f21148ea-1d37-41c7-8e9a-145f413fbed4",
      id: 352605290,
      user: {
        id: 2521714,
        login: "lyudmilamikh",
      },
      place_guess:
        "ул. 11-ая аллея, д. 13 Ульянка, СДТ «Кировец-1», Санкт-Петербург, Россия, 198255",
      observed_on: "2026-04-24",
      time_observed_at: "2026-04-24T09:20:32+03:00",
      quality_grade: "research",
      license_code: "cc-by-nc",
      taxon: {
        id: 950603,
        name: "Anemonoides nemorosa",
        preferred_common_name: "wood anemone",
        rank: "species",
      },
      photos: [
        {
          id: 643520909,
          url: "https://inaturalist-open-data.s3.amazonaws.com/photos/643520909/square.jpg",
          attribution: "(c) Людмила Михайлова, some rights reserved (CC BY-NC)",
          license_code: "cc-by-nc",
        },
      ],
    },
  ],
};

export const observationPhotoResponse3: iNatObservationsBasicAPI = {
  total_results: 82,
  page: 1,
  per_page: 1,
  results: [
    {
      uuid: "f0dc538a-0a99-4a5d-82b5-0c08f75ec210",
      id: 353837202,
      user: {
        id: 8844304,
        login: "evaowl",
      },
      place_guess: "Парголово, Санкт-Петербург, Россия",
      observed_on: "2026-04-24",
      time_observed_at: "2026-04-24T15:11:00+03:00",
      quality_grade: "research",
      license_code: "cc-by-nc",
      taxon: {
        id: 144510,
        name: "Chroicocephalus ridibundus",
        preferred_common_name: "Black-headed Gull",
        rank: "species",
      },
      photos: [
        {
          id: 645542010,
          url: "https://inaturalist-open-data.s3.amazonaws.com/photos/645542010/square.jpg",
          attribution: "(c) EvaOwl, some rights reserved (CC BY-NC)",
          license_code: "cc-by-nc",
        },
      ],
    },
  ],
};
