import type { SimulationParams } from "@/types/simulation";

export type SimulationField = {
  key: keyof SimulationParams;
  label: string;
  unit?: string;
};

export const geometriaFields: readonly SimulationField[] = [
  { key: "xcg", label: "Posição do centro de gravidade (xcg)", unit: "m" },
  {
    key: "xac_w",
    label: "Posição do centro aerodinâmico da asa (xac_w)",
    unit: "m",
  },
  { key: "cw", label: "Corda média da asa (cw)", unit: "m" },
  { key: "iw", label: "Ângulo de incidência da asa (iw)", unit: "°" },
  { key: "sw", label: "Área da asa (sw)", unit: "m²" },
  { key: "ct", label: "Corda média da cauda (ct)", unit: "m" },
  { key: "it", label: "Ângulo de incidência da cauda (it)", unit: "°" },
  { key: "st", label: "Área da cauda (st)", unit: "m²" },
  { key: "lt", label: "Braço da cauda (lt)", unit: "m" },
] as const;

export const aerodinamicaFields: readonly SimulationField[] = [
  { key: "cm_ac", label: "Momento no centro aerodinâmico (cm_ac)" },
  { key: "cl_0", label: "Sustentação em α = 0 (cl_0)" },
  { key: "cl_alpha", label: "Derivada de Cl em função de α (cl_alpha)" },
] as const;

export const graphicFields: readonly SimulationField[] = [
  { key: "alphaMin", label: "Ângulo mínimo de ataque", unit: "°" },
  { key: "alphaMax", label: "Ângulo máximo de ataque", unit: "°" },
  { key: "alphaStep", label: "Passo do ângulo de ataque", unit: "°" },
] as const;
