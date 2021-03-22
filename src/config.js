export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://gentle-escarpment-91215.herokuapp.com"
    : "http://localhost:8000";
