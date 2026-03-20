//disable eslint rule for this file

//disable prettier for this file
/* prettier-ignore */
import React, { useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  ReferenceDot,
} from "recharts";

import {
  Card,
  CardContent,
  //CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import diagramaAsa from "../assets/diagramaAsa.jpeg";
import diagramaCauda from "../assets/diagramaCauda.jpeg";
import diagramaFuselagem from "../assets/diagramaFuselagem.jpeg";
import analiseAlpha from "../assets/analiseAlpha.jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GeometriaPanel } from "@/components/ui/geometry";
import { AerodinamicaPanel } from "@/components/ui/aerodynamics";
import { runSimulation } from "@/utils/calculations";
import { GraphAdjustmentPanel } from "@/components/ui/graph_adjustment";
import { FaHome, FaSave } from "react-icons/fa";
import { MdBrowserUpdated } from "react-icons/md";
//import { runSimulation } from "src/utils/calculations";
import {
  useCreateSimulation,
  useUpdateSimulation,
} from "@/hooks/use_simulation";
import type { SimulationParams } from "@/types/simulation";
import { PARAM_LIMITS } from "../types/limits";
import { SimulationService } from "@/services/simulation";

const Simulacao: React.FC = () => {
  // Getting from URL params
  const simulationId = window.location.pathname.split("/").pop();

  const [chartData, setChartData] = useState<
    {
      alpha: number;
      cm_total: number;
      cm_wing: number;
      cm_tail: number;
    }[]
  >([]);

  //fechar e abrir painéis laterais
  const [geometriaOpen, setGeometriaOpen] = useState(true);
  const [aerodinamicaOpen, setAerodinamicaOpen] = useState(true);
  const [graphicOpen, setGraphicOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const createSimulation = useCreateSimulation();
  const updateSimulation = useUpdateSimulation();

  const handleCreateSimulation = () => {
    const sanitizedParams = sanitizeParams(params);
    createSimulation.mutate(sanitizedParams);
  };
  const handleUpdateSimulation = () => {
    const sanitizedParams = sanitizeParamsUpdate(params);
    if (!simulationId) return;
    updateSimulation.mutate({
      data: { ...sanitizedParams, simulation_id: simulationId },
    });
  };
  const [params, setparams] = useState<SimulationParams>({
    xcg: 0.0,
    xac_w: 0.0,
    cw: 0.0,
    iw: 0.0,
    sw: 0.0,
    ct: 0.0,
    it: 0.0,
    st: 0.0,
    lt: 0.0,
    cm_ac: 0.0,
    cl_0: 0.0,
    cl_alpha: 0.0,
    alphaMin: -5.0,
    alphaMax: 15.0,
    alphaStep: 1.0,
  });

  useEffect(() => {
    if (simulationId) {
      setIsLoading(true);
      const simulation = SimulationService.getSimulationById(simulationId);
      simulation.then((data) => {
        const sim = data.cm_simulation;
        setparams({
          xcg: sim.xcg,
          xac_w: sim.xac_w,
          sw: sim.sw,
          st: sim.st,
          cw: sim.cw,
          ct: sim.ct,
          iw: sim.iw,
          it: sim.it,
          lt: sim.lt,
          cm_ac: sim.cm_ac,
          cl_0: sim.cl_0,
          cl_alpha: sim.cl_alpha,
          alphaMin: -5.0,
          alphaMax: 15.0,
          alphaStep: 1.0,
        });
      });
      setIsLoading(false);
    }
  }, []);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  // Ensure all values remain floats
  const handleChange = (field: keyof SimulationParams, value: number) => {
    const limits = PARAM_LIMITS[field];
    // Always cast to float
    const floatValue =
      typeof value === "string" ? parseFloat(value) : Number(value);
    if (!limits || Number.isNaN(floatValue)) return;
    const safeValue = clamp(floatValue, limits.min, limits.max);
    setparams((prev) => ({
      ...prev,
      [field]: safeValue,
    }));
  };

  // parse everything to float
  const sanitizeParams = (params: SimulationParams): SimulationParams => {
    const sanitized: SimulationParams = { ...params };
    for (const key in sanitized) {
      const value = sanitized[key as keyof SimulationParams];
      sanitized[key as keyof SimulationParams] =
        typeof value === "string" ? parseFloat(value) : Number(value);
    }
    return sanitized;
  };

  // parse everything to float and change keys for update should be new_xcg, new_xac_w, etc.
  const sanitizeParamsUpdate = (params: SimulationParams): SimulationParams => {
    const sanitized: SimulationParams = { ...params };
    const updated: SimulationParams = {} as SimulationParams;
    for (const key in sanitized) {
      const value = sanitized[key as keyof SimulationParams];
      const newKey = `new_${key}` as keyof SimulationParams;
      updated[newKey] =
        typeof value === "string" ? parseFloat(value) : Number(value);
    }
    return updated;
  };

  useEffect(() => {
    if (params.cw > 0 && params.sw > 0) {
      const results = runSimulation(params);
      setChartData(results);
    }
  }, [params]);

  const equilibrio = chartData.find(
    (p, i) => i > 0 && p.cm_total * chartData[i - 1].cm_total <= 0,
  );

  return (
    <div className="min-h-screen p-2 flex flex-row bg-gray-100">
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-90 h-screen w-screen flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      )}
      {/* Logo */}
      {/*
      <img
        src={logo}
        alt="IMT AeroDesign Logo"
        className="absolute top-4 left-4 w-20 h-20"
      />
      */}

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1">
        {/* Área do gráfico */}
        <Card className="max-w-[1020px] h-[625px]">
          <CardHeader>
            <CardTitle>Simulação</CardTitle>
            {/* <CardDescription>
              Showing total visitors for the last 6 months
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                cm: {
                  label: "cm",
                  color: "var(--chart-1)",
                },
              }}
            >
              <AreaChart
                width={600}
                height={300}
                data={chartData}
                margin={{ left: 16, right: 24, top: 16, bottom: 32 }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                {/* Eixo X */}
                <XAxis
                  dataKey="alpha"
                  domain={["dataMin - 2", "dataMax + 5"]}
                  label={{
                    value: "α (graus)",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />

                {/* Eixo Y */}
                <YAxis />

                {/* Linha Cm = 0 */}
                <ReferenceLine
                  y={0}
                  stroke="red"
                  strokeDasharray="4 4"
                  label={{ value: "cm = 0", position: "right" }}
                />

                {/* Ponto de equilíbrio */}
                {equilibrio && (
                  <ReferenceDot
                    x={equilibrio.alpha}
                    y={equilibrio.cm_total}
                    r={6}
                    fill="red"
                    w-
                    stroke="white"
                    label={{
                      value: `α = ${equilibrio.alpha}°`,
                      position: "top",
                      fill: "#000",
                      fontSize: 12,
                    }}
                  />
                )}

                {/* Curva Cm */}
                <Area
                  type="monotone"
                  dataKey="cm_total"
                  stroke="#223b80"
                  fill="#223b80"
                  fillOpacity={0.3}
                  name="cm Total"
                />

                {/* Asa somente */}
                <Area
                  type="monotone"
                  dataKey="cm_wing"
                  stroke="#16a34a"
                  fill="#16a34a"
                  fillOpacity={0.15}
                  name="Asa"
                />

                {/* Cauda somente */}
                <Area
                  type="monotone"
                  dataKey="cm_tail"
                  stroke="#dc2626"
                  fill="#dc2626"
                  fillOpacity={0.15}
                  name="Cauda"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Botões inferiores */}
        <div className="flex justify-evenly p-3 bg-white rounded-xl shadow-lg m-4">
          <Link
            to={"/"}
            className="flex items-center gap-4 px-12 bg-[#223b80] text-white font-semibold cursor-pointer rounded-lg shadow-md"
          >
            Home{" "}
            <span className="text-lg cursor-pointer">
              <FaHome />
            </span>
          </Link>
          <button
            onClick={handleUpdateSimulation}
            className="flex items-center gap-4 px-12 bg-[#223b80] text-white font-semibold cursor-pointer rounded-lg shadow-md"
          >
            Atualizar{" "}
            <span className="text-lg cursor-pointer">
              <MdBrowserUpdated />
            </span>
          </button>
          <button
            onClick={handleCreateSimulation}
            className="flex items-center gap-2 px-12 bg-[#223b80] text-white font-semibold cursor-pointer rounded-lg shadow-md"
          >
            Salvar{" "}
            <span className="text-lg cursor-pointer">
              <FaSave />
            </span>
          </button>
        </div>
      </div>
      {/* Painel lateral */}
      <div className="w-[300px] h-[625px] bg-white shadow-xl p-3 border border-orange-300 rounded-lg flex flex-col">
        <div className="flex-1 overflow-y-auto pr-2 scroll-invisible">
          <div
            className="flex justify-between items-center cursor-pointer border-b border-orange-300 mb-4 flex-shrink-0"
            onClick={() => setGraphicOpen(!graphicOpen)}
          >
            <h2 className="text-xl font-semibold text-gray-800">
              Ajuste do Gráfico
            </h2>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                graphicOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>

          {graphicOpen && (
            <form className="flex flex-col gap-4 relative">
              <GraphAdjustmentPanel params={params} onChange={handleChange} />
            </form>
          )}
          {/* Cabecalho "Geometria" */}
          <div
            className="flex justify-between items-center cursor-pointer border-b border-orange-300 mb-4 flex-shrink-0"
            onClick={() => setGeometriaOpen(!geometriaOpen)}
          >
            <h2 className="text-xl font-semibold text-gray-800">Geometria</h2>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                geometriaOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
          {/* Parametros Geometria */}
          {geometriaOpen && (
            <form className="flex flex-col gap-4 relative">
              <GeometriaPanel params={params} onChange={handleChange} />

              <div className="mt-4 pt-4 border-t border-gray-200" />
              <span className="text-orange-600 font-semibold">
                Diagrama da asa:
              </span>
              <div className="flex item-center cursor-pointer">
                <img
                  src={diagramaAsa}
                  alt="diagrama da asa"
                  className="w-70 h-35 border border-orange-300 rounded-lg mt--3 mb-2"
                />
              </div>
              <span className="text-orange-600 font-semibold">
                Diagrama da cauda:
              </span>
              <div className="flex item-center">
                <img
                  src={diagramaCauda}
                  alt="diagrama da asa"
                  className="w-70 h-35 border border-orange-300 rounded-lg mt--3 mb-2"
                />
              </div>
              <span className="text-orange-600 font-semibold">
                Diagrama da fuselagem:
              </span>
              <div className="flex item-center">
                <img
                  src={diagramaFuselagem}
                  alt="diagrama da asa"
                  className="w-70 h-90 border border-orange-300 rounded-lg mt--3 mb-2"
                />
              </div>
            </form>
          )}
          {/* Cabecalho "Aerodinamica" */}
          <div
            className="flex justify-between items-center cursor-pointer border-b border-orange-300 flex-shrink-0 mt-6 mb-4"
            onClick={() => setAerodinamicaOpen(!aerodinamicaOpen)}
          >
            <h2 className="text-xl font-semibold text-gray-800">
              Aerodinamica
            </h2>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                aerodinamicaOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
          {/* Parametros Aerodinamica */}
          {aerodinamicaOpen && (
            <form className="flex flex-col gap-4 relative">
              <AerodinamicaPanel params={params} onChange={handleChange} />

              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-orange-600 font-semibold">
                  Analise de C em funcao de α
                </span>
                <div className="flex item-center">
                  <img
                    src={analiseAlpha}
                    alt="diagrama da asa"
                    className="w-70 h-80 border border-orange-300 rounded-lg mt-2"
                  />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simulacao;
