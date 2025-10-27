
export function runSimulation(params: SimulationParams) {
  // converte ângulos Iw (wing incidence) e It (tail incidence) de graus para radianos
  const iw = (params.iw * Math.PI) / 180;
  const it = (params.it * Math.PI) / 180;

  // cálculos básicos:
  // Momento da asa em relação ao centro de gravidade, Cm (wing moment contribution), 
  const Cm_w =
    params.Cm_ac + params.Cl_0 * ((params.Xcg - params.Xac_w) / params.cw);
  //Contribuição da cauda horizontal
  const Cm_t = -params.Cl_alpha * (params.lt / params.cw) * (iw - it);
  //Momento total e estabilidade
  const Cm_total = Cm_w + Cm_t;

  return {
    Cm_w,
    Cm_t,
    Cm_total,
    estabilidade: Cm_total < 0 ? "estável" : "instável",
  };
}
