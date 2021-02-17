// **************** ROUTE CONSTANT START **************************
// General Page Section
export const DASHBOARD = "/dashboard";
export const SETTINGS = "/dashboard/profile";

// **************** ROUTE CONSTANT END **************************

// export const BASE_URL = process.env.API_URL || "https://darasa-backend.loca.lt";
// export const BASE_URL = process.env.API_URL || "http://127.0.0.1:8000";

//Todo  configure environment variable to app url.
export const BASE_URL =
  process.env.API_URL ||
  "https://techminia.com/" ||
  "http://68.183.19.253:8000" ||
  "https://darasa-backend.herokuapp.com";
export const CURRENCY = "Ksh.";
