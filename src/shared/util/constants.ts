export const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#?\]]).{10,}$/;

export const REGEX_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const REGEX_UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
