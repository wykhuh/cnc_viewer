import type { RouterType } from "../types/app";

const Router: RouterType = {
  init: () => {
    // Event Handler for URL changes
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.pathname);
    });

    Router.go(window.location.pathname);
  },
  go: (path: string) => {
    let pageElement = null;
    switch (path) {
      case "/about/":
        pageElement = document.createElement("page-about");
        break;
      default:
        pageElement = document.createElement("page-home");
        break;
    }

    const mainEl = document.querySelector("#app") as HTMLElement;
    mainEl.innerHTML = "";
    mainEl.appendChild(pageElement);
    window.scrollX = 0;
    window.scrollY = 0;
  },
};
export default Router;
