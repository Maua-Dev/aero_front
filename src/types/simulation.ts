export interface SimulationParams {
  xcg: number;
  xac_w: number;
  cw: number;
  iw: number;
  sw: number;
  ct: number;
  it: number;
  st: number;
  lt: number;
  cm_ac: number;
  cl_0: number;
  cl_alpha: number;
  alphaMin?: number;
  alphaMax?: number;
  alphaStep?: number;
}
