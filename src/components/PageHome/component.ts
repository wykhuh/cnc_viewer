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
import { fetchProject } from "./data_utils.ts";

class PageHome extends HTMLElement {
  constructor() {
    super();
  }

  map: L.Map | null = null;
  markers: L.Marker[] = [];

  connectedCallback() {
    setupComponent(template, this);

    this.render(window.app);
  }

  disconnectedCallback() {}

  // TODO: allow users to set verifiable, quality_grade
  // TODO: allow users to select projects by place
  // TODO: allow users to select new random project
  handleEvent(event: Event) {
    let target = event.target as HTMLInputElement;
    if (!target) return;
  }

  async render(appStore: AppStoreType) {
    this.map = renderMap();

    let randomProject = fetchProject(appStore);
    appStore.project = randomProject;

    // render project
    this.markers = renderProjectsOnMap([randomProject], this.map);
    renderProjectsList([randomProject], this);

    // render species list
    let containerEl = this.querySelector("#data-container");
    if (containerEl) {
      let speciesEl = document.createElement("species-list");
      containerEl.append(speciesEl);
    }
  }
}

customElements.define("page-home", PageHome);
