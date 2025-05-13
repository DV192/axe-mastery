import { MeshStandardMaterial, Vector3 } from "three";
import { randFloat, randFloatSpread, randInt } from "three/src/math/MathUtils";
import { create } from "zustand";

export const BALLOON_COLORS = ["white", "#b7b0e3", "#5a47ce"];

export const balloonMaterials = {};

BALLOON_COLORS.forEach((color) => {
  balloonMaterials[color] = new MeshStandardMaterial({ color });
})

export const useGame = create((set, get) => ({
  axeLaunched: false,
  balloons: [],
  firstGame: true,
  balloonsHit: 0,
  targetHit: 0,
  throws: 0,
  launchAxe: () => {
    if (get().axeLaunched || get().throws <= 0) return;

    set({
      axeLaunched: true,
      throws: get().throws - 1,
    });
    setTimeout(() => {
      set(() => ({ axeLaunched: false }));
    }, 2000);
  },
  startGame: () => {
    set(() => ({
      axeLaunched: false,
      balloons: new Array(50).fill(0).map((_, index) => ({
        id: `balloon_${index}_${Math.random()}`,
        position: new Vector3(
          randFloat(8, 18),
          randFloat(-20, 0),
          randFloatSpread(1),
        ),
        color: BALLOON_COLORS[randInt(0, BALLOON_COLORS.length - 1)],
      })),
      firstGame: false,
      balloonsHit: 0,
      targetHit: 0,
      throws: 3,
    }))
  },
  onBalloonHit: () => {
    set((state) => ({
      balloonsHit: state.balloonsHit + 1,
    }));
  },
  onTargetHit: () => {
    set((state) => ({
      targetHit: state.targetHit + 1,
    }));
  },
}))