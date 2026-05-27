import {
  expandIcon,
  leftBigIcon,
  playIcon,
  rightBigIcon,
} from "../../assets/icons";
import { iNatObservationsUrl, siteCC } from "../../data/inat_data";
import { createSpinner } from "../../lib/spinner";
import { pluralize, sampleArray, sleep } from "../../lib/utils";
import type {
  AppStoreType,
  NormalizedSpeciesObservation,
  Project,
} from "../../types/app";
import type {
  ObservationsBasicResult,
  ObservationsSpeciesBasicResult,
} from "../../types/inat_api";
import { fetchObservationBasicForTaxon } from "../PageHome/data_utils";

export function renderCarousel(
  appStore: AppStoreType,
  componentCtx: HTMLElement,
) {
  let containerEl = componentCtx.querySelector("#carousel");
  if (!containerEl) return;
  let observations = appStore.speciesObservations;
  if (!observations) return;
  let project = appStore.project;
  if (!project) return;

  containerEl.innerHTML = "";
  let content = "";
  content += `<div role="group" id="carousel-controls" aria-label="carousel controls">`;
  content += `<button id="toggle-animation" aria-label="Start animation" title="Start animation">${playIcon}</button>`;
  content += "<div id='item-selector'>";
  content += `<button id="prev-selector" aria-label="Previous slide">${leftBigIcon}</button>`;

  // button to show/hide carousel item
  observations.forEach((obs, i) => {
    let { taxon } = obs;
    let count = i + 1;
    let classnames = ["carousel-item-selector"];
    if (i == 0) {
      classnames.push("current");
    }
    content += `<button
    class="${classnames.join(" ")}"
    data-item-index="${i}"
    data-item-id="${taxon.id}"
    aria-disabled="${i === 0 ? true : false}">
      <span class="sr-only">Show slide ${count} of ${observations.length}: ${taxon.name}</span>
      ${count}
    </button>`;
  });

  content += `<button id="next-selector" aria-label="Next slide">${rightBigIcon}</button>`;
  content += `</div>`;
  content += `<button id='fullscreen' aria-label="Fullscrren" title="Fullscreen">${expandIcon}</button>`;
  content += "</div>"; // id="carousel-controls"
  // container for carousel item
  observations.forEach((obs, i) => {
    let { taxon } = obs;
    let count = i + 1;
    content += `<div
      ${i > 0 ? "hidden" : ""}
      class="carousel-item"
      data-item-index="${i}"
      data-item-id="${taxon.id}"
      role="group"
      aria-roledescription="carousel item"
      aria-labelledby="carousel-item-${count}__heading"
    >`;
    content += renderCarouselItem(obs, count, project);
    content += `</div>`; // class="carousel-item"
  });
  containerEl.innerHTML = content;
}

function renderCarouselItem(
  obs: NormalizedSpeciesObservation,
  count: number,
  project: Project,
) {
  let { taxon, photos } = obs;

  // image
  let content = "<figure class='media'>";
  if (photos && photos.length > 0) {
    let photo = photos[0];
    if (siteCC.includes(photo.license_code)) {
      if (photo.url) {
        content += `<img src=${photo.url.replace("square", "large")} alt="photo of ${taxon.preferred_common_name}, ${taxon.name}">`;
      }
    } else {
      content += "<div>";
      content += `Note: Photo not displayed because photo is `;
      if (photo.license_code) {
        content += photo.license_code;
      } else {
        content += "all rights reserved";
      }
      content += "</div>";
    }
  }
  content += "</figure>";

  // details
  content += '<div class="details">';
  content += `<h2 id="carousel-item-${count}__heading">`;
  let link = `${iNatObservationsUrl}?project_id=${project.id}&taxon_id=${taxon.id}`;
  if (taxon.preferred_common_name) {
    content += `<span><a href="${link}">${taxon.preferred_common_name}</a></span> `;
  }
  if (taxon.name) {
    content += `(<span><a href="${link}">${taxon.name}</a></span>)`;
  } else {
    content += "Unknown";
  }
  content += `</h2>`;

  content += `<div>${pluralize(obs.count, "observation")}</div>`;

  content += "<dl>";
  if (siteCC.includes(obs.license_code)) {
    if (obs.user) {
      content += "<div>";
      content += `<dt>Observer:&nbsp;</dt><dd>${obs.user.login}</dd>`;
      content += "</div>";
    }
    if (obs.observed_on) {
      content += "<div>";
      content += `<dt>Observed date:&nbsp;</dt><dd>${obs.observed_on}</dd>`;
      content += "</div>";
    }
    if (obs.place_guess) {
      content += "<div>";
      content += `<dt>Place guess:&nbsp;</dt><dd>${obs.place_guess}</dd>`;
      content += "</div>";
    }
    if (obs.quality_grade) {
      content += "<div>";
      content += `<dt>Status:&nbsp;</dt><dd>${obs.quality_grade}</dd>`;
      content += "</div>";
    }
    if (photos && photos.length > 0) {
      content += "<div>";
      content += `<dt>Photo:&nbsp;</dt><dd>${photos[0].attribution}</dd>`;
      content += "</div>";
    }
  } else {
    content += `<dt>Note:&nbsp;</dt><dd>Observation not displayed because observation is `;
    if (obs.license_code) {
      content += obs.license_code;
    } else {
      content += "all rights reserved";
    }
    content += `</dd>`;
  }

  content += "<div>";
  content += `<dt>Link:&nbsp;</dt><dd><a href='${iNatObservationsUrl}/${obs.id}'>iNaturalist Observations page</a></dd>`;
  content += "</div>";
  content += "</dl>";

  content += "</div>"; // class="details"

  return content;
}

export function setCurrentTaxon(index: number, componentCtx: HTMLElement) {
  let currentItemContainer = componentCtx.querySelector<HTMLDivElement>(
    `.carousel-item:not([hidden])`,
  );
  if (currentItemContainer) {
    currentItemContainer.hidden = true;
  }
  let itemContainer = componentCtx.querySelector<HTMLDivElement>(
    `.carousel-item[data-item-index='${index}']`,
  );
  if (itemContainer) {
    itemContainer.hidden = false;
  }
}

export async function fetchAndRenderOtherObservations(
  observations: NormalizedSpeciesObservation[],
  project: Project,
  compontentCtx: HTMLElement,
) {
  let count = 2;
  let spinner = createSpinner();
  spinner.start();

  for await (let obs of observations) {
    await sleep(1);
    let data = await fetchObservationBasicForTaxon(obs.taxon, project);
    if (data) {
      let normalizedObs = formatNormalizedSpeciesObservation(
        { taxon: obs.taxon, count: obs.count },
        data,
      );

      // add photos to existing <figure>
      let figureEl = compontentCtx.querySelector<HTMLDivElement>(
        `.carousel-item[data-item-id='${normalizedObs.taxon.id}']`,
      );

      if (figureEl && normalizedObs.photos) {
        figureEl.innerHTML = "";
        let content = renderCarouselItem(normalizedObs, count, project);
        figureEl.innerHTML = content;
      }
      count += 1;
    }
  }
}

export function formatNormalizedSpeciesObservation(
  taxon: ObservationsSpeciesBasicResult,
  observations: ObservationsBasicResult[],
): NormalizedSpeciesObservation {
  let data: NormalizedSpeciesObservation = {
    count: taxon.count,
    taxon: taxon.taxon,
  };
  // select observation with allowed CC observation and photo
  let ccObservationPhoto = sampleArray(
    observations.filter(
      (obs) =>
        siteCC.includes(obs.license_code) &&
        obs.photos.some((photo) => siteCC.includes(photo.license_code)),
    ),
  );
  if (ccObservationPhoto) {
    addObservationData(data, ccObservationPhoto);
    return data;
  }

  // select observation with allowed CC photo
  let ccPhoto = sampleArray(
    observations.filter((obs) =>
      obs.photos.some((photo) => siteCC.includes(photo.license_code)),
    ),
  );
  if (ccPhoto) {
    addObservationData(data, ccPhoto);
    return data;
  }

  // select observation with allowed CC observation
  let ccObservation = sampleArray(
    observations.filter((obs) => siteCC.includes(obs.license_code)),
  );
  if (ccObservation) {
    addObservationData(data, ccObservation);
    return data;
  }

  // select first observation
  if (observations.length > 0) {
    addObservationData(data, observations[0]);
  }

  return data;
}

function addObservationData(
  data: NormalizedSpeciesObservation,
  observation: ObservationsBasicResult,
) {
  data.id = observation.id;
  data.user = observation.user;
  data.place_guess = observation.place_guess;
  data.observed_on = observation.observed_on;
  data.time_observed_at = observation.time_observed_at;
  data.quality_grade = observation.quality_grade;
  data.license_code = observation.license_code;

  // select photo with allowed CC license
  let ccPhoto = sampleArray(
    observation.photos.filter((photo) => siteCC.includes(photo.license_code)),
  );
  if (ccPhoto) {
    data.photos = [ccPhoto];
    // select first photo
  } else if (observation.photos.length > 0) {
    data.photos = [observation.photos[0]];
  }
}
