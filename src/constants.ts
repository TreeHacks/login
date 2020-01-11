import settings from "./themes/settings";

export var GROUPS = {
  'admin': 'Administrator',
  'reviewer': 'Reviewer',
  'sponsor': 'Sponsor',
  'judge': 'Judge'
};

export var STATUS = {
  INCOMPLETE: "incomplete",
  SUBMITTED: "submitted",
  WAITLISTED: "waitlisted",
  REJECTED: "rejected",
  ADMITTED: "admitted",
  ADMISSION_CONFIRMED: "admission_confirmed",
  ADMISSION_DECLINED: "admission_declined"
}

export var TYPE = {
  IN_STATE: "is",
  OUT_OF_STATE: "oos",
  STANFORD: "stanford"
}

export var DEADLINES = settings.deadlines;

export var TRANSPORTATION_STATUS = {
  UNAVAILABLE: "unavailable",
  AVAILABLE: "available",
  SUBMITTED: "submitted",
  REJECTED: "rejected",
  APPROVED: "approved",
  PAID: "paid"
};

export var TRANSPORTATION_TYPES = {
  BUS: "bus",
  FLIGHT: "flight",
  OTHER: "other"
};

export var TRANSPORTATION_BUS_ROUTES = {
  TEST: "test",
  TEST_NO_COORDINATOR: "test_no_coordinator",
  USC: "usc",
  UCLA: "ucla",
  SANDIEGO: "sandiego",
  UCI: "uci",
  POMONA: "pomona",
  BERKELEY: "berkeley"
};

export var TRANSPORTATION_DEADLINES = {
  [TRANSPORTATION_TYPES.FLIGHT]: 'December 9th at 11:59pm PST',
  [TRANSPORTATION_TYPES.BUS]: 'January 10th at 11:59pm PST',
  [TRANSPORTATION_TYPES.OTHER]: 'February 19th at 11:59pm PST'
};

export const HACKATHON_YEAR = settings.hackathon_year;
export const HACKATHON_DATE_RANGE = settings.hackathon_date_range;
export const LOCATIONS = settings.locations;

export const VERTICALS = ["health", "safety", "awareness"];

export const FLOORS = [0, 1, 2, 3];

export const logo = settings.logo;
export const favicon = settings.favicon;
export const dashboardBackground = settings.dashboard_background;

export const LOGIN_REDIRECT_WHITELISTED_DOMAIN = "treehacks";
export const LOGIN_REDIRECT_WHITELISTED_TLD = "com";