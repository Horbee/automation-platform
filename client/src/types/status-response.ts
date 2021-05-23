import { FanSpeedValues } from "./vacuum";

export interface StatusResponse {
  data: StatusProps;
}

export interface StatusProps {
  battery: number;
  clean_area: number;
  clean_time: number;
  dnd_enabled: number;
  error_code: number;
  fan_power: FanSpeedValues;
  in_cleaning: number;
  in_fresh_state: number;
  in_returning: number;
  lab_status: number;
  lock_status: number;
  map_present: number;
  map_status: number;
  msg_seq: number;
  msg_ver: number;
  state: number;
  water_box_status: number;
}
