import { LANDING, PAGES } from "constants/routes.constants";
const arr = [LANDING, PAGES];
export function isCategoryPage(pathname) {
  return arr.includes(pathname);
}
