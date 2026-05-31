import { projectYearProjetCount } from "../../data/inat_data";
import { html } from "../../lib/component_utils";

export const template = html`
  <app-header></app-header>
  <main>
    <div id="content">
      <div id="side">
        <div id="map"></div>

        <div id="form-group">
          <label for="year-select">Year</label>
          <select id="year-select">
            ${yearOptions()}
          </select>
        </div>

        <div class="form-group">
          <label
            >Search
            <input id="search-places" type="text" autocomplete="off" />
          </label>
        </div>

        <div id="selected-resources-list"></div>
        <button id="new-project" class="btn-primary">Select new project</button>
      </div>

      <div id="data-container"></div>
    </div>
  </main>
`;

function yearOptions() {
  // 2016 and 2017 umbrella project do not contain project ids
  // 2024 umbrella project does not exists
  return projectYearProjetCount
    .reverse()
    .map((project) => {
      return `<option value="${project.year}">${project.year} (${project.projects_count} projects)</option>\n`;
    })
    .join("");
}
