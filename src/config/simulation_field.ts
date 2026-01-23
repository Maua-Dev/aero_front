import type { SimulationParams } from "@/types/simulation";

export type SimulationField = {
  key: keyof SimulationParams;
  label: string;
  unit?: string;
};

export const geometriaFields: readonly SimulationField[] = [
  { key: "Xcg", label: "Posição do centro de gravidade (Xcg)", unit: "m" },
  {
    key: "Xac_w",
    label: "Posição do centro aerodinâmico da asa (Xac_w)",
    unit: "m",
  },
  { key: "cw", label: "Corda média da asa (cw)", unit: "m" },
  { key: "iw", label: "Ângulo de incidência da asa (iw)", unit: "°" },
  { key: "Sw", label: "Área da asa (Sw)", unit: "m²" },
  { key: "ct", label: "Corda média da cauda (ct)", unit: "m" },
  { key: "it", label: "Ângulo de incidência da cauda (it)", unit: "°" },
  { key: "St", label: "Área da cauda (St)", unit: "m²" },
  { key: "lt", label: "Braço da cauda (lt)", unit: "m" },
] as const;

export const aerodinamicaFields: readonly SimulationField[] = [
  { key: "Cm_ac", label: "Momento no centro aerodinâmico (Cm_ac)" },
  { key: "Cl_0", label: "Sustentação em α = 0 (Cl_0)" },
  { key: "Cl_alpha", label: "Derivada de Cl em função de α (Cl_alpha)" },
] as const;

export const graphicFields: readonly SimulationField[] = [
  { key: "alphaMin", label: "Ângulo mínimo de ataque", unit: "°" },
  { key: "alphaMax", label: "Ângulo máximo de ataque", unit: "°" },
  { key: "alphaStep", label: "Passo do ângulo de ataque", unit: "°" },
] as const;
