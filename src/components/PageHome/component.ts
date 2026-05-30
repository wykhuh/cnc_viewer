import "leaflet/dist/leaflet.css";
import type { Circle, Map, GeoJSON } from "leaflet";
import "../../assets/autocomplete.css";

import { setupComponent } from "../../lib/component_utils";
import type { AppStoreType } from "../../types/app";
import { template } from "./template";
import {
  initFilters,
  renderMap,
  renderSelectedProject,
  renderProjectOnMap,
  renderSelectedPlaces,
  renderProjectsWithinPlaceOnMap,
} from "./render_utils.ts";
import {
  loadProjectsCsv,
  selectRandomProject,
  projectsWithinPlaceHandler,
} from "./data_utils.ts";
import { updateAppUrl } from "../../lib/url_utils.ts";
import { throttledFetch } from "../../lib/utils.ts";
import { createSpinner } from "../../lib/spinner.ts";
import {
  placeSelectedHandler,
  setupPlacesSearch,
} from "../../lib/search_places.ts";
import { removeMap } from "../../lib/map_utils.ts";

class PageHome extends HTMLElement {
  constructor() {
    super();
  }

  map: Map | null = null;
  placeLayer: GeoJSON | undefined = undefined;
  projectLayer: GeoJSON | undefined = undefined;
  projectsWithinPlace: Circle[] = [];
  newProjectEl: HTMLButtonElement | null = null;
  yearSelectEl: HTMLSelectElement | null = null;
  searchInputEl: HTMLInputElement | null = null;

  connectedCallback() {
    setupComponent(template, this);

    this.render(window.app.store);

    this.newProjectEl = this.querySelector("#new-project");
    this.yearSelectEl = this.querySelector("#year-select");
    this.searchInputEl = document.querySelector("#search-places");

    this.newProjectEl?.addEventListener("click", this);
    this.yearSelectEl?.addEventListener("change", this);
    window.addEventListener("loadNewProject", this);
    this.searchInputEl?.addEventListener("selection", this);
  }

  disconnectedCallback() {
    this.newProjectEl?.removeEventListener("click", this);
    this.yearSelectEl?.removeEventListener("change", this);
    window.removeEventListener("loadNewProject", this);
    window.removeEventListener("selection", this);
    this.removeMapLayers();
    removeMap(window.app.store);
  }

  handleEvent(event: CustomEvent) {
    let target = event.target as HTMLInputElement;
    if (!target) return;

    let appStore = window.app.store;

    if (event.type === "click") {
      if (target.id === "new-project") {
        this.newProjectHandler(appStore);
      }
    }

    if (event.type === "loadNewProject") {
      this.newProjectHandler(appStore);
    }

    if (event.type === "change") {
      if (target.id === "year-select") {
        let spinner = createSpinner(".project-loader");
        spinner.start();
        let year = Number(target.value);
        appStore.currentYear = year;
        loadProjectsCsv(year, appStore).then(() => {
          this.newProjectHandler(appStore);
          spinner.stop();
        });
      }
    }

    if (event.type === "selection") {
      let place = event.detail.selection.value;
      // add place to store and map
      placeSelectedHandler(place, appStore);

      // add projects within place to store and map, rerender caroseul,
      projectsWithinPlaceHandler(place, appStore);
      if (appStore.data.projectsForPlace) {
        this.newProjectHandler(appStore);
      }
    }
  }

  async render(appStore: AppStoreType) {
    let selectedProject = appStore.selectedProject;
    if (!selectedProject) return;

    setupPlacesSearch("#search-places");

    // render map
    if (!appStore.map) {
      appStore.map = renderMap();
    }

    initFilters(appStore, this);

    // render places
    let placeLayer = renderSelectedPlaces(appStore);
    if (placeLayer) {
      this.placeLayer = placeLayer;
    }

    // render project
    let layer = await renderProjectOnMap(appStore);
    if (layer) {
      this.projectLayer = layer;
    }
    renderSelectedProject(selectedProject, this);

    // render projects within place
    let markers = renderProjectsWithinPlaceOnMap(appStore);
    if (markers) {
      this.projectsWithinPlace = markers;
    }

    // render species list
    let containerEl = this.querySelector("#data-container");
    if (containerEl) {
      containerEl.innerHTML = "";
      let speciesEl = document.createElement("species-list");
      containerEl.append(speciesEl);
    }
  }

  newProjectHandler(appStore: AppStoreType) {
    // cancel existing fetch observations for previous project
    throttledFetch.cancel();
    // pick new project
    appStore.selectedProject = selectRandomProject(appStore);
    // update url
    updateAppUrl(window.location, appStore);
    // update UI
    this.removeMapLayers();
    this.render(appStore);
  }

  removeMapLayers() {
    this.projectsWithinPlace.forEach((marker) => marker.remove());
    this.projectLayer?.remove();
    this.placeLayer?.remove();
  }
}

customElements.define("page-home", PageHome);
