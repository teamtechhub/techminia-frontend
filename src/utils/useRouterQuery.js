import { useLocation } from "react-router-dom";

export function useRouterQuery() {
  return new URLSearchParams(useLocation().search);
}
