import { iNatProjectsUrl } from "../../data/inat_data";
import { html, setupComponent } from "../../lib/component_utils";
import type { AppStoreType } from "../../types/app";

const template = html``;

class SelectedProject extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    setupComponent(template, this);

    this.render(window.app.store);
  }

  async render(appStore: AppStoreType) {
    let project = appStore.selectedProject;
    if (!project) return "";

    let content = html`
      <div class="project-list-item">
        <div class="data">
          <h2>
            <a href="${iNatProjectsUrl}/${project.id}">${project.title}</a>
          </h2>
          <div>${project.place_display_name}</div>
          <div class="count">${project.species_count} species</div>
        </div>
      </div>
    `;

    this.innerHTML = content;
  }
}

customElements.define("selected-project", SelectedProject);
