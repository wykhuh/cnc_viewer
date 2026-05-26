import type {
  iNatObservationsBasicAPI,
  iNatObservationsSpeciesBasicAPI,
} from "../types/inat_api";

// https://api.inaturalist.org/v2/observations/species_counts?photos=true&verifiable=true&spam=false&project_id=279758&per_page=10&ttl=3600&fields=(taxon:(id:!t,name:!t,default_photo:(id:!t,url:!t,attribution:!t,license_code:!t),preferred_common_name:!t,rank:!t))
export const observationSpecies: iNatObservationsSpeciesBasicAPI = {
  total_results: 4,
  page: 1,
  per_page: 10,
  results: [
    {
      count: 1,
      taxon: {
        id: 145630,
        name: "Micronia aculeata",
        default_photo: {
          id: 81322141,
          url: "https://inaturalist-open-data.s3.amazonaws.com/photos/81322141/square.jpeg",
          attribution:
            "(c) Aniruddha Singhamahapatra, some rights reserved (CC BY-NC), uploaded by Aniruddha Singhamahapatra",
          license_code: "cc-by-nc",
        },
        preferred_common_name: "Grey Swallowtail Moth",
        rank: "species",
      },
    },
    {
      count: 1,
      taxon: {
        id: 324446,
        name: "Hyarotis adrastus",
        default_photo: {
          id: 5945032,
          url: "https://inaturalist-open-data.s3.amazonaws.com/photos/5945032/square.jpeg",
          attribution:
            "(c) David Renoult, some rights reserved (CC BY-NC), uploaded by David Renoult",
          license_code: "cc-by-nc",
        },
        preferred_common_name: "Tree Flitter",
        rank: "species",
      },
    },
    {
      count: 1,
      taxon: {
        id: 372852,
        name: "Cucujiformia",
        default_photo: {
          id: 39322219,
          url: "https://static.inaturalist.org/photos/39322219/square.jpg",
          attribution: "(c) mstoyanova, all rights reserved",
          license_code: null,
        },
        preferred_common_name: "Cucujiform Beetles",
        rank: "infraorder",
      },
    },
    {
      count: 1,
      taxon: {
        id: 891441,
        name: "Pyrops azureus",
        default_photo: {
          id: 195251170,
          url: "https://inaturalist-open-data.s3.amazonaws.com/photos/195251170/square.jpeg",
          attribution:
            "(c) Arpitha Jayanth, some rights reserved (CC BY-NC), uploaded by Arpitha Jayanth",
          license_code: "cc-by-nc",
        },
        rank: "species",
      },
    },
  ],
};

// https://api.inaturalist.org/v2/observations?photos=true&verifiable=true&spam=false&taxon_id=145630&project_id=279758&per_page=1&order_by=random&fields=(id:!t,user:(login:!t),place_guess:!t,observed_on:!t,time_observed_at:!t,quality_grade:!t,license_code:!t,taxon:(name:!t,preferred_common_name:!t,rank:!t),photos:(id:!t,url:!t,attribution:!t,license_code:!t))
export const observationPhotoResponse: iNatObservationsBasicAPI = {
  total_results: 1,
  page: 1,
  per_page: 1,
  results: [
    {
      uuid: "75dd395f-92d4-48da-8202-bdecb3ec8019",
      id: 354423481,
      user: { id: 9937436, login: "betsybaa28" },
      place_guess: "VV56+PMP, Andaman and Nicobar Islands 744204, India",
      observed_on: "2026-04-26",
      time_observed_at: "2026-04-26T12:42:10+05:30",
      quality_grade: "research",
      license_code: "cc-by-nc",
      taxon: {
        id: 145630,
        name: "Micronia aculeata",
        preferred_common_name: "Grey Swallowtail Moth",
        rank: "species",
      },
      photos: [
        {
          id: 646556767,
          url: "https://inaturalist-open-data.s3.amazonaws.com/photos/646556767/square.jpg",
          attribution: "(c) Betsy Baa, some rights reserved (CC BY-NC)",
          license_code: "cc-by-nc",
        },
        {
          id: 646556909,
          url: "https://inaturalist-open-data.s3.amazonaws.com/photos/646556909/square.jpg",
          attribution: "(c) Betsy Baa, some rights reserved (CC BY-NC)",
          license_code: "cc-by-nc",
        },
        {
          id: 646557039,
          url: "https://inaturalist-open-data.s3.amazonaws.com/photos/646557039/square.jpg",
          attribution: "(c) Betsy Baa, some rights reserved (CC BY-NC)",
          license_code: "cc-by-nc",
        },
        {
          id: 646557181,
          url: "https://inaturalist-open-data.s3.amazonaws.com/photos/646557181/square.jpg",
          attribution: "(c) Betsy Baa, some rights reserved (CC BY-NC)",
          license_code: "cc-by-nc",
        },
        {
          id: 646557347,
          url: "https://inaturalist-open-data.s3.amazonaws.com/photos/646557347/square.jpg",
          attribution: "(c) Betsy Baa, some rights reserved (CC BY-NC)",
          license_code: "cc-by-nc",
        },
      ],
    },
  ],
};

export const observationPhotoResponse2: iNatObservationsBasicAPI = {
  total_results: 1,
  page: 1,
  per_page: 1,
  results: [
    {
      uuid: "3e68fcda-815f-4cca-b95b-f91030248811",
      id: 357804291,
      user: { id: 6130594, login: "vaibhavinat" },
      place_guess:
        "32P5+V37, Ramnagar, Diglipur, Andaman and Nicobar Islands 744202, India",
      observed_on: "2026-04-27",
      time_observed_at: "2026-04-27T11:59:46+05:30",
      quality_grade: "research",
      license_code: null,
      taxon: {
        id: 324446,
        name: "Hyarotis adrastus",
        preferred_common_name: "Tree Flitter",
        rank: "species",
      },
      photos: [
        {
          id: 652649829,
          url: "https://static.inaturalist.org/photos/652649829/square.jpg",
          attribution: "(c) Vaibhav Pednekar, all rights reserved",
          license_code: "cc-by-nd",
        },
      ],
    },
  ],
};

export const observationPhotoResponse3: iNatObservationsBasicAPI = {
  total_results: 8,
  page: 1,
  per_page: 3,
  results: [
    {
      uuid: "1203efd8-7b3b-4f51-b678-fd8043b755df",
      id: 354404313,
      user: { id: 4801946, login: "hellblazerg" },
      place_guess: "Hamilton, OH, US",
      observed_on: "2026-04-26",
      time_observed_at: "2026-04-26T10:27:00-04:00",
      quality_grade: "research",
      license_code: null,
      taxon: {
        id: 54857,
        name: "Celtis occidentalis",
        preferred_common_name: "common hackberry",
        rank: "species",
      },
      photos: [
        {
          id: 646525698,
          url: "https://static.inaturalist.org/photos/646525698/square.jpg",
          attribution: "(c) hellblazerg, all rights reserved",
          license_code: null,
        },
      ],
    },
    {
      uuid: "224b7d42-225b-4bf5-a95d-31a5b0271c20",
      id: 353595560,
      user: { id: 5703101, login: "whitelr" },
      place_guess: "Hamilton, OH, US",
      observed_on: "2026-04-25",
      time_observed_at: "2026-04-25T11:08:39-04:00",
      quality_grade: "needs_id",
      license_code: "cc-by-nc",
      taxon: {
        id: 54857,
        name: "Celtis occidentalis",
        preferred_common_name: "common hackberry",
        rank: "species",
      },
      photos: [
        {
          id: 645139631,
          url: "https://inaturalist-open-data.s3.amazonaws.com/photos/645139631/square.jpg",
          attribution: "(c) whitelr, some rights reserved (CC BY-NC)",
          license_code: "cc-by-nc",
        },
      ],
    },
    {
      uuid: "15783148-210d-4bfb-aaa6-86a4be34729b",
      id: 354597218,
      user: { id: 51451, login: "tburns" },
      place_guess: "Zoellners Way, Fairfield Township, OH, US",
      observed_on: "2026-04-26",
      time_observed_at: "2026-04-26T14:03:20-04:00",
      quality_grade: "needs_id",
      license_code: "cc-by-nc",
      taxon: {
        id: 54857,
        name: "Celtis occidentalis",
        preferred_common_name: "common hackberry",
        rank: "species",
      },
      photos: [
        {
          id: 646843314,
          url: "https://inaturalist-open-data.s3.amazonaws.com/photos/646843314/square.jpg",
          attribution: "(c) tburns, some rights reserved (CC BY-NC)",
          license_code: "cc-by-nc",
        },
      ],
    },
  ],
};
