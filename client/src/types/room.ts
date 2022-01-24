export interface RoomModel {
  id: number;
  name: string;
  room_id: number;
  is_active: boolean;
  created_at: string;
}

export interface AddRoomModel {
  name: string;
  room_id: number;
  is_active: boolean;
}
