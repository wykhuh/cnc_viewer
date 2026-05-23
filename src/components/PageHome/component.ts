import L, { Polygon } from "leaflet";
import "leaflet/dist/leaflet.css";

import { setupComponent } from "../../lib/component_utils";
import type { AppStoreType } from "../../types/app";
import { template } from "./template";
import {
  renderLatLine,
  renderMap,
  renderProjectsList,
  renderProjectsOnMap,
} from "./render_utils.ts";
import { getTargetProjects } from "./data_utils.ts";

class PageHome extends HTMLElement {
  constructor() {
    super();
  }

  latitudeControlEl: HTMLInputElement | null = null;
  latitudeValue = 34;
  latitudeLine: Polygon<any> | null = null;
  map: L.Map | null = null;
  markers: L.Marker[] = [];

  connectedCallback() {
    setupComponent(template, this);

    this.latitudeControlEl = this.querySelector("#latitude-control");

    this.render(window.app);

    this.latitudeControlEl?.addEventListener("change", this);
  }

  disconnectedCallback() {
    this.latitudeControlEl?.removeEventListener("change", this);
  }

  handleEvent(event: Event) {
    let target = event.target as HTMLInputElement;
    if (!target) return;
    if (!this.latitudeLine) return;
    if (!this.map) return;

    if (event.type === "change") {
      this.latitudeValue = Number(target.value);
      this.initLatitudeSlider(this.latitudeValue);
      this.latitudeLine.remove();
      this.latitudeLine = renderLatLine(this.latitudeValue, this.map);

      this.markers.forEach((m) => m.remove());
      let projects = getTargetProjects(this.latitudeValue, window.app);
      renderProjectsList(projects, this);
      this.markers = renderProjectsOnMap(projects, this.map);
    }
  }

  async render(appStore: AppStoreType) {
    this.initLatitudeSlider(this.latitudeValue);
    this.map = renderMap();
    this.latitudeLine = renderLatLine(this.latitudeValue, this.map);

    let projects = getTargetProjects(this.latitudeValue, appStore);
    renderProjectsList(projects, this);
    this.markers = renderProjectsOnMap(projects, this.map);
  }

  initLatitudeSlider(latitudeValue: number) {
    if (!this.latitudeControlEl) return;

    this.latitudeControlEl.value = latitudeValue.toString();
  }
}

customElements.define("page-home", PageHome);
