// components/SimulationCard.tsx
import { runSimulation } from "@/utils/calculations";
import React, { useEffect, useState } from "react";
import { ChartContainer } from "./chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import { FaRegTrashAlt } from "react-icons/fa";

interface Simulation {
  simulation_id: string;
  xcg: number;
  xac_w: number;
  sw: number;
  st: number;
  cw: number;
  ct: number;
  iw: number;
  it: number;
  lt: number;
  cm_ac: number;
  cl_0: number;
  cl_alpha: number;
}

interface SimulationCardProps {
  id?: string;
  title: string;
  simulation: Simulation;
  date?: string;
  hasImage?: boolean;
  onClick?: () => void;
  onDelete: (id: string) => void;
}

const SimulationCard: React.FC<SimulationCardProps> = ({
  title,
  hasImage = true,
  simulation,
  date,
  onClick,
  onDelete,
}) => {
  const params = simulation;

  const [chartData, setChartData] = useState<
    {
      alpha: number;
      cm_total: number;
      cm_wing: number;
      cm_tail: number;
    }[]
  >([]);

  const equilibrio = chartData.find(
    (p, i) => i > 0 && p.cm_total * chartData[i - 1].cm_total <= 0,
  );

  useEffect(() => {
    if (params.cw > 0 && params.sw > 0) {
      const results = runSimulation(params);
      setChartData(results);
    }
  }, [params]);

  return (
    <div
      className="bg-white rounded-lg shadow p-2 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      {hasImage && simulation ? (
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
          </AreaChart>
        </ChartContainer>
      ) : hasImage ? (
        <div className="h-40 w-56 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
          <span className="text-gray-400">Sem imagem</span>
        </div>
      ) : null}

      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <button
        className="h-8 w-8 bg-red-200 hover:cursor-pointer rounded-lg hover:bg-red-400 duration-200 hover:shadow-2xs flex items-center justify-center mt-1"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(simulation.simulation_id);
        }}
      >
        <FaRegTrashAlt />
      </button>

      {date && (
        <p className="text-xs text-gray-400 mt-1">
          {new Date(date).toLocaleDateString("pt-BR")}
        </p>
      )}
    </div>
  );
};

export default SimulationCard;
