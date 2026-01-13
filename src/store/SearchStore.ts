import { create } from "zustand";

interface SearchStore {
  queryText: string;
  typeToFind: string;
  setQueryText: (text: string) => void;
  setTypeToFind: (type: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  queryText: "",
  typeToFind: "",
  setQueryText: (text) => {
    set({ queryText: text });
  },
  setTypeToFind: (type) => set({ typeToFind: type }),
}));
