export interface User {
  id: string;
  email: string;
  name: string;
}

export interface userData {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export enum SortType {
  Name = "Name",
  Email = "Email",
  LastLogin = "LastLogin",
  CreatedAt = "CreatedAt",
}

export interface Countries {
  id: string;
  name: string;
  capital: string;
  code: string;
}

export interface Weather {
  location: Location;
  current: Current;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface Timezone {
  status: string;
  message: string;
  zones: Zone[];
}

export interface Zone {
  countryCode: string;
  countryName: string;
  zoneName: string;
  gmtOffset: number;
  timestamp: number;
}

export interface currentTimezone {
  utc_offset: string;
  timezone: string;
  day_of_week: number;
  day_of_year: number;
  datetime: string;
  utc_datetime: string;
  unixtime: number;
  raw_offset: number;
  week_number: number;
  dst: boolean;
  abbreviation: string;
  dst_offset: number;
}
