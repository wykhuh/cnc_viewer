import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { setupComponent } from "../../lib/component_utils";
import type { AppStoreType } from "../../types/app";
import { template } from "./template";
import {
  initFilters,
  renderMap,
  renderProjectsList,
  renderProjectsOnMap,
} from "./render_utils.ts";
import { loadProjectsCsv, selectRandomProject } from "./data_utils.ts";
import { updateAppUrl } from "../../lib/url_utils.ts";
import { throttledFetch } from "../../lib/utils.ts";
import { createSpinner } from "../../lib/spinner.ts";

class PageHome extends HTMLElement {
  constructor() {
    super();
  }

  map: L.Map | null = null;
  markers: L.Marker[] = [];
  newProjectEl: HTMLButtonElement | null = null;
  yearSelectEl: HTMLSelectElement | null = null;

  connectedCallback() {
    setupComponent(template, this);

    this.render(window.app.store);

    this.newProjectEl = this.querySelector("#new-project");
    this.yearSelectEl = this.querySelector("#year-select");

    this.newProjectEl?.addEventListener("click", this);
    this.yearSelectEl?.addEventListener("change", this);
    window.addEventListener("loadNewProject", this);
  }

  disconnectedCallback() {
    this.newProjectEl?.removeEventListener("click", this);
    this.yearSelectEl?.removeEventListener("change", this);
    window.removeEventListener("loadNewProject", this);
  }

  handleEvent(event: Event) {
    let target = event.target as HTMLInputElement;
    if (!target) return;
    if (!this.map) return;

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
        appStore.year = year;
        loadProjectsCsv(year, appStore).then(() => {
          this.newProjectHandler(appStore);
          spinner.stop();
        });
      }
    }
  }

  async render(appStore: AppStoreType) {
    if (!appStore.project) return;

    if (!this.map) {
      this.map = renderMap();
    }

    // render project
    this.markers = renderProjectsOnMap([appStore.project], this.map);
    renderProjectsList([appStore.project], this);

    initFilters(appStore, this);
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
    appStore.project = selectRandomProject(appStore);
    // update url
    updateAppUrl(window.location, appStore);
    // update UI
    this.markers.forEach((marker) => marker.remove());
    this.render(appStore);
  }
}

customElements.define("page-home", PageHome);
