export const StateCodeMapping = new Map<number, string>([
  [1, "Starting"],
  [2, "Charger disconnected"],
  [3, "Idle"],
  [4, "Remote control active"],
  [5, "Cleaning"],
  [6, "Returning home"],
  [7, "Manual mode"],
  [8, "Charging"],
  [9, "Charging problem"],
  [10, "Paused"],
  [11, "Spot cleaning"],
  [12, "Error"],
  [13, "Shutting down"],
  [14, "Updating"],
  [15, "Docking"],
  [16, "Going to target"],
  [17, "Zoned cleaning"],
  [18, "Segment cleaning"],
  [100, "Charging complete"],
  [101, "Device offline"]
]);

export const ErrorCodeMapping = new Map<number, string>([
  [0, "No error"],
  [1, "Laser distance sensor error"],
  [2, "Collision sensor error"],
  [3, "Wheels on top of void, move robot"],
  [4, "Clean hovering sensors, move robot"],
  [5, "Clean main brush"],
  [6, "Clean side brush"],
  [7, "Main wheel stuck?"],
  [8, "Device stuck, clean area"],
  [9, "Dust collector missing"],
  [10, "Clean filter"],
  [11, "Stuck in magnetic barrier"],
  [12, "Low battery"],
  [13, "Charging fault"],
  [14, "Battery fault"],
  [15, "Wall sensors dirty, wipe them"],
  [16, "Place me on flat surface"],
  [17, "Side brushes problem, reboot me"],
  [18, "Suction fan problem"],
  [19, "Unpowered charging station"],
  [21, "Laser disance sensor blocked"],
  [22, "Clean the dock charging contacts"],
  [23, "Docking station not reachable"],
  [24, "No-go zone or invisible wall detected"]
]);

export const RoomList = [
  "Work",
  "Bedroom",
  "Bathroom",
  "Corridor",
  "Living Room",
  "Kitchen"
];
