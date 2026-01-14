import { create } from "zustand";

interface BattleStore {
  logs: string[];
  setLogs: (logs: string[]) => void;
}

export const useBattleStore = create<BattleStore>((set) => ({
  logs: [],

  setLogs: (logs: string[]) => set({ logs }),
}));
