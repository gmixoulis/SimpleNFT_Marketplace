export const SURVEY_TOKEN_KEY = "survey:auth";
export const SURVEY_KEY = "my-survey";
let BACKEND_URL;
if (
  process.env.REACT_APP_ENV === "DEV" ||
  process.env.REACT_APP_ENV !== "PROD"
) {
  BACKEND_URL = "https://metau-dev.unic.ac.cy:3003"; // "http://localhost:3000"; //
} else {
  BACKEND_URL = "https://metau.unic.ac.cy:3003"; //"http://localhost:3000"; //
}

export { BACKEND_URL };
