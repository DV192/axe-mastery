import { create } from "zustand";

export const useGame = create((set, get) => ({
  axeLaunched: false,
  balloons: [],
  launchAxe: () => {
    set({ axeLaunched: true });
    setTimeout(() => {
      set(() => ({ axeLaunched: false }));
    }, 2000);
  }
}))