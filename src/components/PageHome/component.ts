import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { setupComponent } from "../../lib/component_utils";
import type { AppStoreType } from "../../types/app";
import { template } from "./template";
import {
  renderMap,
  renderProjectsList,
  renderProjectsOnMap,
} from "./render_utils.ts";
import { selectRandomProject } from "./data_utils.ts";
import { updateAppUrl } from "../../lib/url_utils.ts";

class PageHome extends HTMLElement {
  constructor() {
    super();
  }

  map: L.Map | null = null;
  markers: L.Marker[] = [];
  newProjectEl: HTMLButtonElement | null = null;

  connectedCallback() {
    setupComponent(template, this);

    this.render(window.app);

    this.newProjectEl = this.querySelector("#new-project");

    this.newProjectEl?.addEventListener("click", this);
    window.addEventListener("loadNewProject", this);
  }

  disconnectedCallback() {
    this.newProjectEl?.removeEventListener("click", this);
    window.removeEventListener("loadNewProject", this);
  }

  // TODO: allow users to set verifiable, quality_grade
  // TODO: allow users to select projects by place
  handleEvent(event: Event) {
    let target = event.target as HTMLInputElement;
    if (!target) return;
    if (!this.map) return;

    let appStore = window.app;

    if (event.type === "click") {
      if (target.id === "new-project") {
        this.markers.forEach((marker) => marker.remove());
        appStore.project = selectRandomProject(appStore);
        updateAppUrl(window.location, appStore);
        this.render(appStore);
      }
    }

    if (event.type === "loadNewProject") {
      this.markers.forEach((marker) => marker.remove());
      appStore.project = selectRandomProject(appStore);
      updateAppUrl(window.location, appStore);
      this.render(appStore);
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

    // render species list
    let containerEl = this.querySelector("#data-container");
    if (containerEl) {
      containerEl.innerHTML = "";
      let speciesEl = document.createElement("species-list");
      containerEl.append(speciesEl);
    }
  }
}

customElements.define("page-home", PageHome);
