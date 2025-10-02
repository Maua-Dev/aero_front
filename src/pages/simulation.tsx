import React from "react";
// import logo from "../assets/logo.png";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

const Simulacao: React.FC = () => {
  const chartData = [
    { month: "January", mobile: 186 },
    { month: "February", mobile: 305 },
    { month: "March", mobile: 237 },
    { month: "April", mobile: 73 },
    { month: "May", mobile: 209 },
    { month: "June", mobile: 214 },
    { month: "July", mobile: 400 },
    { month: "August", mobile: 300 },
    { month: "September", mobile: 250 },
    { month: "October", mobile: 320 },
    { month: "November", mobile: 280 },
    { month: "December", mobile: 350 },
  ];
  const chartConfig = {
    desktop: {
      label: "mobile",
      color: "var(--chart-1)",
    },
  };
  const [geometriaOpen, setGeometriaOpen] = useState(true);
  const [aerodinamicaOpen, setAerodinamicaOpen] = useState(true);

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
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
        {/* <div className="flex-1 flex items-center"> */}
        {/* Eixos */}
        {/* <svg width="900" height="510" className=""> */}
        {/* Eixo X */}
        {/* <line
              x1="100"
              y1="490"
              x2="860"
              y2="490"
              stroke="black"
              strokeWidth="2"
            />
            <text x="850" y="495" fontSize="18" fontWeight="bold">
              &gt;
            </text> */}

        {/* Eixo Y */}
        {/* <line
              x1="101"
              y1="490"
              x2="101"
              y2="40"
              stroke="black"
              strokeWidth="2"
            />
            <text x="93.3" y="53" fontSize="22" fontWeight="bold">
              ^
            </text> */}

        {/* Labels */}
        {/* <text x="70" y="65" fontWeight="">
              Cm
            </text>
            <text x="832" y="509" fontSize="20" fontWeight="">
              α
            </text>
            <text x="670" y="60" fontSize="18">
              Ponto de Equil.:
            </text>
            <line
              x1="795"
              y1="60"
              x2="855"
              y2="60"
              stroke="black"
              strokeWidth="1"
            />
          </svg> */}

        {/* <span className="absolute top-1 right-1">Ponto de Equil.:</span> */}
        {/* </div> */}
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
          {/* Cabecalho "Geometria" */}
          <div
            className="flex justify-between items-center cursor-pointer border-b border-orange-300 mb-4 flex-shrink-0"
            onClick={() => setGeometriaOpen(!geometriaOpen)}
          >
            <h2 className="text-xl font-semibold text-gray-800">Geometria</h2>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${geometriaOpen ? "rotate-180" : ""}`}
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
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  Posição do centro de gravidade (Xcg):
                </span>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-[120px] p-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                  <span className="ml-2 text-gray-500">m</span>
                </div>
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  Posição do centro aerodinâmico da asa (Xac_w):
                </span>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-[120px] bg-gray-100 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="ml-2 text-gray-500">m</span>
                </div>
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  Corda média da asa (cw):
                </span>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-[120px] bg-gray-100 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="ml-2 text-gray-500">m</span>
                </div>
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  Ângulo de incidência da asa (iw):
                </span>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-[120px] bg-gray-100 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="ml-2 text-gray-500">°</span>
                </div>
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  Área da asa (Sw):
                </span>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-[120px] bg-gray-100 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="ml-2 text-gray-500">m²</span>
                </div>
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  Corda média da cauda (ct):
                </span>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-[120px] bg-gray-100 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="ml-2 text-gray-500">m</span>
                </div>
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  Ângulo de incidência da cauda (it):
                </span>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-[120px] bg-gray-100 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="ml-2 text-gray-500">°</span>
                </div>
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  Área da cauda (St):
                </span>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-[120px] bg-gray-100 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="ml-2 text-gray-500">m²</span>
                </div>
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  Braço da cauda (lt):
                </span>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-[120px] bg-gray-100 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="ml-2 text-gray-500">m</span>
                </div>
              </label>

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
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${aerodinamicaOpen ? "rotate-180" : ""}`}
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
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  Momento no centro aerodinamico (Cm_ac):
                </span>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-[120px] bg-gray-100 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="ml-2 text-gray-500">kg.m/s</span>
                </div>
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  Sustentacao em α=0(Cl_0):
                </span>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-[120px] bg-gray-100 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  Derivada de Cl em funcao de α(Cl_alpha):
                </span>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-[270px] bg-gray-100 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </label>
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

// "use client";
// import { TrendingUp } from "lucide-react";
// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// export const description = "A simple area chart";
// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];
// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-1)",
//   },
// } satisfies ChartConfig;
// export function ChartAreaDefault() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Area Chart</CardTitle>
//         <CardDescription>
//           Showing total visitors for the last 6 months
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <AreaChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="line" />}
//             />
//             <Area
//               dataKey="desktop"
//               type="natural"
//               fill="var(--color-desktop)"
//               fillOpacity={0.4}
//               stroke="var(--color-desktop)"
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter>
//         <div className="flex w-full items-start gap-2 text-sm">
//           <div className="grid gap-2">
//             <div className="flex items-center gap-2 leading-none font-medium">
//               Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//             </div>
//             <div className="text-muted-foreground flex items-center gap-2 leading-none">
//               January - June 2024
//             </div>
//           </div>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }
