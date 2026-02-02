import type { SimulationParams } from "@/types/simulation";

export const PARAM_LIMITS: Record<
  keyof SimulationParams,
  { min: number; max: number }
> = {
  // Geometria
  xcg: { min: -1, max: 1 },
  xac_w: { min: 0, max: 1 },
  cw: { min: 0, max: 1000 },
  sw: { min: 0, max: 1000 },
  iw: { min: -10, max: 10 },

  // Cauda
  ct: { min: 0.1, max: 5 },
  st: { min: 0, max: 1000 },
  it: { min: -10, max: 10 },
  lt: { min: 0, max: 1000 },

  // Aerodinâmica
  cm_ac: { min: -0.5, max: 0.5 },
  cl_0: { min: -1, max: 1 },
  cl_alpha: { min: 0, max: 10 },

  // Gráfico
  alphaMin: { min: -30, max: 20 },
  alphaMax: { min: 20, max: 60 },
  alphaStep: { min: 0.1, max: 20 },
};
