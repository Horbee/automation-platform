import { useEffect, useState } from "react";

import { RoomEndpoints } from "../../api/room";
import {
    useConfirmationModal
} from "../../custom-components/confirmation-dialog/useConfirmationDialog";
import { AddRoomModel, RoomModel } from "../../types/room";

export const useRoomAdminPage = () => {
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomModel>();
  const { getConfirmation } = useConfirmationModal();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    RoomEndpoints.getAll().then((rooms) => setRooms(rooms));
  };

  const fetchRoomById = async (roomId: number) => {
    return await RoomEndpoints.getById(roomId);
  };

  const addNewRoom = async (room: AddRoomModel) => {
    try {
      await RoomEndpoints.addRoom(room);
      fetchRooms();
    } catch (err) {}
  };

  const updateRoom = async (room: RoomModel) => {
    try {
      await RoomEndpoints.updateById(room.id, room);
      setSelectedRoom(undefined);
      fetchRooms();
    } catch (err) {}
  };

  const removeRoom = async (roomId: number) => {
    const confirmed = await getConfirmation(
      "Delete Room",
      "Are you sure you want to delete this room?"
    );
    if (!confirmed) return;

    try {
      await RoomEndpoints.deleteRoomById(roomId);
      fetchRooms();
    } catch (err) {}
  };

  return {
    rooms,
    selectedRoom,
    setSelectedRoom,
    fetchRoomById,
    updateRoom,
    removeRoom,
    addNewRoom,
  };
};
