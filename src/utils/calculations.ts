import type { SimulationParams } from "@/types/simulation";

export const runSimulation = (params: SimulationParams) => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // 🔒 Proteção contra entradas inválidas
  if (params.cw <= 0 || params.sw <= 0) return [];

  // Constantes
  const eta = 0.9;
  const deda = 0.4;
  const cl_alpha_tail = params.cl_alpha * 0.8;

  // Intervalo de alpha (ajustável)
  const alphaMin = params.alphaMin ?? -5;
  const alphaMax = params.alphaMax ?? 15;
  const alphaStep = params.alphaStep ?? 1;

  // Volume de cauda
  const VH = (params.lt * params.st) / (params.cw * params.sw);

  // Braço adimensional da asa
  const braço_asa = (params.xcg - params.xac_w) / params.cw;

  // Asa
  const cm0_w =
    params.cm_ac +
    (params.cl_0 + params.cl_alpha * toRad(params.iw)) * braço_asa;

  const cma_w = params.cl_alpha * braço_asa;

  // Cauda
  const cm0_t = -eta * VH * cl_alpha_tail * toRad(params.it);
  const cma_t = -eta * VH * cl_alpha_tail * (1 - deda);

  // Total
  //const Cm0 = Cm0_w + Cm0_t;
  //const Cma = Cma_w + Cma_t;

  // Geração dos dados
  // const data: { alpha: number; Cm: number }[] = [];

  // for (let aDeg = alphaMin; aDeg <= alphaMax; aDeg += alphaStep) {
  //   const aRad = toRad(aDeg);
  //   const Cm = Cm0 + Cma * aRad;

  //   data.push({
  //     alpha: aDeg,
  //     Cm: Number(Cm.toFixed(5)),
  //   });
  // }

  // return data;
  // Geração dos dados
  const data: {
    alpha: number;
    cm_total: number;
    cm_wing: number;
    cm_tail: number;
  }[] = [];

  for (let aDeg = alphaMin; aDeg <= alphaMax; aDeg += alphaStep) {
    const aRad = toRad(aDeg);

    const cm_wing = cm0_w + cma_w * aRad;
    const cm_tail = cm0_t + cma_t * aRad;
    const cm_total = cm_wing + cm_tail;

    data.push({
      alpha: aDeg,
      cm_total: Number(cm_total.toFixed(5)),
      cm_wing: Number(cm_wing.toFixed(5)),
      cm_tail: Number(cm_tail.toFixed(5)),
    });
  }

  return data;
};
