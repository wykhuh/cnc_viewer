import "./components/PageHome/component.ts";

const mainEl = document.querySelector("#app") as HTMLElement;
if (mainEl) {
  const pageElement = document.createElement("page-home");
  mainEl.appendChild(pageElement);
}
