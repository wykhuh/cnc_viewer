import { xIcon } from "../../assets/icons";
import { iNatPlacesUrl } from "../../data/inat_data";
import { html, setupComponent } from "../../lib/component_utils";
import { removePlace } from "../../lib/search_places";
import { pluralize } from "../../lib/utils";
import type { AppStoreType } from "../../types/app";

const template = html``;

class SelectedPlace extends HTMLElement {
  constructor() {
    super();
  }

  closeEl: null | HTMLButtonElement = null;

  connectedCallback() {
    setupComponent(template, this);

    this.render(window.app.store);

    this.closeEl = this.querySelector(".close-button");
    this.closeEl?.addEventListener("click", this);
  }

  disconnectedCallback() {
    this.closeEl?.removeEventListener("click", this);
  }

  handleEvent(event: Event) {
    if (event.type === "click") {
      removePlace(window.app.store);
    }
  }

  async render(appStore: AppStoreType) {
    let place = appStore.selectedPlaces;
    if (!place) return "";

    let content = html`
      <div class="place-list-item">
        <div class="data">
          <h2>
            <a href="${iNatPlacesUrl}/${place.id}">${place.display_name}</a>
          </h2>
          <div class="count">
            ${pluralize(appStore.data.projectsForPlace.length, "project")}
          </div>
        </div>
        <button class="close-button">${xIcon}</button>
      </div>
    `;

    this.innerHTML = content;
  }
}

customElements.define("selected-place", SelectedPlace);
