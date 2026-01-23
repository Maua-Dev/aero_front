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
  CardDescription,
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
//import { runSimulation } from "src/utils/calculations";

import type { SimulationParams } from "@/types/simulation";

const Simulacao: React.FC = () => {
  const [chartData, setChartData] = useState<{ alpha: number; Cm: number }[]>(
    [],
  );

  //fechar e abrir painéis laterais
  const [geometriaOpen, setGeometriaOpen] = useState(true);
  const [aerodinamicaOpen, setAerodinamicaOpen] = useState(true);
  const [graphicOpen, setGraphicOpen] = useState(true);

  const [params, setparams] = useState<SimulationParams>({
    Xcg: 0,
    Xac_w: 0,
    cw: 0,
    iw: 0,
    Sw: 0,
    ct: 0,
    it: 0,
    St: 0,
    lt: 0,
    Cm_ac: 0,
    Cl_0: 0,
    Cl_alpha: 0,
    alphaMin: -5,
    alphaMax: 15,
    alphaStep: 1,
  });
  const handleChange = (field: keyof typeof params, value: number) => {
    setparams((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (params.cw > 0 && params.Sw > 0) {
      const results = runSimulation(params);
      setChartData(results);
    }
  }, [params]);

  const equilibrio = chartData.find(
    (p, i) => i > 0 && p.Cm * chartData[i - 1].Cm <= 0,
  );

  return (
    <div className="min-h-screen p-2 flex flex-row bg-gray-100">
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
        <Card>
          <CardHeader>
            <CardTitle>Area Chart</CardTitle>
            <CardDescription>
              Showing total visitors for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                Cm: {
                  label: "Cm",
                  color: "var(--chart-1)",
                },
              }}
            >
              <AreaChart
                width={600}
                height={300}
                data={chartData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                {/* Eixo X */}
                <XAxis
                  dataKey="alpha"
                  domain={["dataMin - 1", "dataMax + 1"]}
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
                  label={{ value: "Cm = 0", position: "right" }}
                />

                {/* Ponto de equilíbrio */}
                {equilibrio && (
                  <ReferenceDot
                    x={equilibrio.alpha}
                    y={equilibrio.Cm}
                    r={6}
                    fill="red"
                    stroke="white"
                  />
                )}

                {/* Curva Cm */}
                <Area
                  type="monotone"
                  dataKey="Cm"
                  stroke="#223b80"
                  fill="#223b80"
                  fillOpacity={0.3}
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
            className="flex items-center gap-4 px-12 bg-[#223b80] text-white font-semibold rounded-lg shadow-md"
          >
            Home <span className="text-lg">🏠</span>
          </Link>
          <button className="flex items-center gap-4 px-12 bg-[#223b80] text-white font-semibold rounded-lg shadow-md">
            Salvar <span className="text-lg">💾</span>
          </button>
        </div>
      </div>
      {/* Painel lateral */}
      <div className="w-[300px] bg-white shadow-xl p-3 border border-orange-300 rounded-lg flex flex-col h-[calc(100vh-1.8rem)]">
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
              <div className="flex item-center">
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
