import "leaflet/dist/leaflet.css";
import type { Map, GeoJSON, Marker } from "leaflet";
import "../../assets/autocomplete.css";

import { setupComponent } from "../../lib/component_utils";
import type { AppStoreType } from "../../types/app";
import { template } from "./template";
import {
  initFilters,
  renderMap,
  renderSelectedResources,
  renderProjectOnMap,
  renderPlaceOnMap,
  renderProjectsWithinPlaceOnMap,
} from "./render_utils.ts";
import {
  loadProjectsCsv,
  selectRandomProject,
  projectsWithinPlaceHandler,
  selectProjectById,
} from "./data_utils.ts";
import { updateAppUrl } from "../../lib/url_utils.ts";
import { throttledFetch } from "../../lib/utils.ts";
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
  projectLayer: GeoJSON | undefined = undefined;
  projectsWithinPlace: Marker[] = [];
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
    this.searchInputEl?.addEventListener("selection", this);

    window.addEventListener("loadRandomProject", this);
    window.addEventListener("loadThisProject", this);
    window.addEventListener("placeRemoved", this);
  }

  disconnectedCallback() {
    this.newProjectEl?.removeEventListener("click", this);
    this.yearSelectEl?.removeEventListener("change", this);
    this.searchInputEl?.removeEventListener("selection", this);

    window.removeEventListener("loadRandomProject", this);
    window.removeEventListener("loadThisProject", this);
    window.removeEventListener("placeRemoved", this);

    this.removeMapLayers(window.app.store);
    removeMap(window.app.store);
  }

  handleEvent(event: CustomEvent) {
    let target = event.target as HTMLInputElement;
    if (!target) return;

    let appStore = window.app.store;

    if (event.type === "click") {
      if (target.id === "new-project") {
        this.newRandomProjectHandler(appStore);
      }
    }

    if (event.type === "loadRandomProject") {
      this.newRandomProjectHandler(appStore);
    } else if (event.type === "loadThisProject") {
      this.newProjectByIdHandler(event.detail.project_id, appStore);
    } else if (event.type === "placeRemoved") {
      this.projectsWithinPlace.forEach((marker) => marker.remove());
      updateAppUrl(window.location, appStore);
      renderSelectedResources(appStore, this);
      if (this.searchInputEl) {
        this.searchInputEl.value = "";
      }
    }

    if (event.type === "change") {
      if (target.id === "year-select") {
        let year = Number(target.value);
        appStore.currentYear = year;
        loadProjectsCsv(year, appStore).then(() => {
          this.newRandomProjectHandler(appStore);
        });
      }
    }

    // when search place is selected
    if (event.type === "selection") {
      let place = event.detail.selection.value;
      // add place to store and map
      placeSelectedHandler(place, appStore);

      // add projects within place to store and map, rerender caroseul,
      projectsWithinPlaceHandler(place, appStore);
      if (appStore.data.projectsForPlace) {
        this.newRandomProjectHandler(appStore);
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
    renderPlaceOnMap(appStore);

    // render project
    let layer = await renderProjectOnMap(appStore);
    if (layer) {
      this.projectLayer = layer;
    }
    renderSelectedResources(appStore, this);

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

  newRandomProjectHandler(appStore: AppStoreType) {
    // cancel existing fetch observations for previous project
    throttledFetch.cancel();
    // pick new project
    appStore.selectedProject = selectRandomProject(appStore);
    // update url
    updateAppUrl(window.location, appStore);
    // update UI
    this.removeMapLayers(appStore);
    this.render(appStore);
  }

  newProjectByIdHandler(id: number, appStore: AppStoreType) {
    // cancel existing fetch observations for previous project
    throttledFetch.cancel();
    // pick new project
    appStore.selectedProject = selectProjectById(id, appStore);

    // update url
    updateAppUrl(window.location, appStore);
    // update UI
    this.removeMapLayers(appStore);
    this.render(appStore);
  }

  removeMapLayers(appStore: AppStoreType) {
    this.projectsWithinPlace.forEach((marker) => marker.remove());
    this.projectLayer?.remove();
    appStore.placesMapLayers?.remove();
  }
}

customElements.define("page-home", PageHome);
