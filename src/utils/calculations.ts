import type { SimulationParams } from "@/types/simulation";

export const runSimulation = (params: SimulationParams) => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // 🔒 Proteção contra entradas inválidas
  if (params.cw <= 0 || params.Sw <= 0) return [];

  // Constantes
  const eta = 0.9;
  const deda = 0.4;
  const cl_alpha_tail = params.Cl_alpha * 0.8;

  // Intervalo de alpha (ajustável)
  const alphaMin = params.alphaMin ?? -5;
  const alphaMax = params.alphaMax ?? 15;
  const alphaStep = params.alphaStep ?? 1;

  // Volume de cauda
  const VH = (params.lt * params.St) / (params.cw * params.Sw);

  // Braço adimensional da asa
  const braço_asa = (params.Xcg - params.Xac_w) / params.cw;

  // Asa
  const Cm0_w =
    params.Cm_ac +
    (params.Cl_0 + params.Cl_alpha * toRad(params.iw)) * braço_asa;

  const Cma_w = params.Cl_alpha * braço_asa;

  // Cauda
  const Cm0_t = -eta * VH * cl_alpha_tail * toRad(params.it);
  const Cma_t = -eta * VH * cl_alpha_tail * (1 - deda);

  // Total
  const Cm0 = Cm0_w + Cm0_t;
  const Cma = Cma_w + Cma_t;

  // Geração dos dados
  const data: { alpha: number; Cm: number }[] = [];

  for (let aDeg = alphaMin; aDeg <= alphaMax; aDeg += alphaStep) {
    const aRad = toRad(aDeg);
    const Cm = Cm0 + Cma * aRad;

    data.push({
      alpha: aDeg,
      Cm: Number(Cm.toFixed(5)),
    });
  }

  return data;
};
