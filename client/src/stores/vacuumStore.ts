import create from "zustand";

import { StatusProps } from "../types/status-response";

export type VacuumStore = {
  status?: StatusProps;
  sendingRoomRequest: boolean;
  sendingActionRequest: boolean;
  statusLoading: boolean;
  setStatus: (data: StatusProps) => void;
  setStatusLoading: (value: boolean) => void;
  setSendingRoomRequest: (value: boolean) => void;
  setSendingActionRequest: (value: boolean) => void;
};

export const vacuumStore = create<VacuumStore>((set) => ({
  status: undefined,
  sendingRoomRequest: false,
  sendingActionRequest: false,
  statusLoading: false,
  setStatus: (data: StatusProps) => set(() => ({ status: data })),
  setStatusLoading: (value: boolean) => set(() => ({ statusLoading: value })),
  setSendingRoomRequest: (value: boolean) =>
    set(() => ({ sendingRoomRequest: value })),
  setSendingActionRequest: (value: boolean) =>
    set(() => ({ sendingActionRequest: value }))
}));
