import { getAppPage } from "../../lib/init_app";
import { formatAppParams } from "../../lib/url_utils";
import type { AppStoreType, RouterType } from "../../types/app";

export async function pageChangeHandler(
  event: CustomEvent,
  appStore: AppStoreType,
  router: RouterType,
) {
  let target = event.target as HTMLInputElement;
  if (!target) return;

  const path = target.getAttribute("href");
  if (!path) return;

  appStore.page = getAppPage(path);

  let url = `${window.location.origin}${path}`;
  let params = formatAppParams(appStore);
  if (params) {
    url += `?${params}`;
  }
  router.go(path);
}
