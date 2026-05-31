<app-header></app-header>

<main id="about-page" class="flow">

# About

[City Nature Challenge](https://www.citynaturechallenge.org/) is an annual event that asks people around the world to document the nature around them using iNaturalist.

City Nature Challenge Viewer is a open-source website that displays the species with the most observations for each CNC project. By showing the top species, I hope people can appreciate the biodiversity represented by each project.

## Instructions

### Select project

By default, this site will display a randomly selected CNC project. The project area will been shown in green on the map. To select another project, click "Select new project".

When a project is selected, the project id is added to the url (e.g. `project_id=123`). This id is the same as the id used by iNaturalist. If you visit the site with `project_id` in the url, the corresponding project will be displayed.

### Select year

By default, this site will display CNC projects from 2026. Use the "Year" menu to select another year.

### Search place

By default this site displays all CNC projects. You can use the place search to select CNC projects that occur within an iNaturalist place. For instance, if you search for "California", all the CNC projects in California will be shown. When you click on one of project markers, the popup has a "Select this project" button. Click the button to switch to the project.

Click the "x" button to remove a place.

### Autoplay

Click the play button <icon-play></icon-play> to turn on autoplay. The species will change after 5 seconds. When we reach the end of the species list, a new project will be selected.

### Fullscreen

Click the fullscreen icon <span class="icon">&#10530;</span> for a fullscreen view.

## Technical Details

This site grabs data from the iNaturalist API. I used a combination of [v1](https://api.inaturalist.org/v1/docs/) and [v2](https://api.inaturalist.org/v2/docs/) API endpoints.

I used Python and pandas to download a list of CNC projects. This site is built using JavaScript/TypeScript, custom web components, CSS, and HTML. This site uses [Leaflet](https://leafletjs.com/) (maps), [Papa Parse](https://www.papaparse.com/) (CSV parser), [Autocomplete.js](https://tarekraafat.github.io/autoComplete.js/) (autocomplete search) and [Turf.js](https://turfjs.org/) (geospatial analysis). I also wanted to keep costs low as possible so this is a static site that is hosted for free on Cloudflare Pages.

I did not use AI prompts or vibe coding to build this site.

### Links

- [Github Repo](https://github.com/wykhuh/cnc-viewer)

</main>
