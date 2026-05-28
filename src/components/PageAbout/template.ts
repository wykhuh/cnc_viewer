import { expandIcon, playIcon } from "../../assets/icons";
import { html } from "../../lib/component_utils";

export const template = html`<app-header></app-header>
  <main id="about-page" class="flow">
    <h1>About</h1>
    <p>
      City Nature Challenge Viewer is a open-source website that allows people
      to view the top species for CNC projects. By showing observations for the
      top species, I hope people can appreciate the biodiversity represented by
      each project.
    </p>

    <h2>Instructions</h2>

    <h3>Select project</h3>
    <p>
      By default, this site will display a randomly selected CNC project. To
      select another project, click "Select new project".
    </p>

    <p>
      When a project is selected, the project slug is added to the url (e.g.
      <code>project_id=project-slug</code>). This is the same slug used on
      iNaturalist.org. If you visit the site with a project slug in the url, the
      corresponding project will be displayed.
    </p>

    <h3>Autoplay</h3>
    <p>
      Click the play icon ${playIcon} to automatically change the species after
      5 seconds. When we reach the end of the species list, a new project will
      be selected.
    </p>

    <h3>Fullscreen</h3>
    <p>
      Click the fullscreen icon <span class="icon">${expandIcon}</span> for a
      fullscreen view.
    </p>

    <h2 id="technical-details">Technical Details</h2>
    <p>
      This site grabs data from the iNaturalist API. I used a combination of
      <a href="https://api.inaturalist.org/v1/docs/">v1</a>
      and <a href="https://api.inaturalist.org/v2/docs/">v2</a> API endpoints. I
      used Python and pandas to download a list of CNC projects from the API,
      and save the list as a CSV.
    </p>
    <p>
      This static site is built using JavaScript/TypeScript, custom web
      components, CSS, and HTML. For the website, I wanted to use the built-in
      features of JavaScript, CSS, HTML, and keep third party libraries to a
      minimum. This site uses Vite, TypeScript,
      <a href="https://leafletjs.com/">Leaflet</a> (maps), and
      <a href="https://www.papaparse.com/">Papa Parse</a> (CSV parser). I also
      wanted to keep costs low as possible so this is a static site that is
      hosted for free on Cloudflare Pages.
    </p>
    <p>I did not use AI prompts or vibe coding to build this site.</p>
    <ul>
      <li>
        <a href="https://github.com/wykhuh/inaturalist-explorer">Github Repo</a>
      </li>
    </ul>
  </main>`;
