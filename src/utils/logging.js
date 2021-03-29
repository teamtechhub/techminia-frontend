const PRODUCTION_MODE = true;

export function logToConsole(logs) {
  if (PRODUCTION_MODE === false) {
    console.log(logs);
  }
}
