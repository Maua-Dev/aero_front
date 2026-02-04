import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Simulation {
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

export interface SimulationsPayload {
  simulations: Simulation[];
  message?: string;
}

export interface SimulationsContextValue {
  simulations: Simulation[];
  setSimulations: (simulations: Simulation[]) => void;
  addSimulation: (simulation: Simulation) => void;
  removeSimulation: (simulationId: string) => void;
  loadFromPayload: (payload: SimulationsPayload) => void;
}

const SimulationsContext = createContext<SimulationsContextValue | undefined>(
  undefined,
);
export function SimulationsProvider({ children }: { children: ReactNode }) {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  function addSimulation(simulation: Simulation) {
    setSimulations((prev) => [...prev, simulation]);
  }
  function removeSimulation(simulationId: string) {
    setSimulations((prev) =>
      prev.filter((s) => s.simulation_id !== simulationId),
    );
  }
  function loadFromPayload(payload: SimulationsPayload) {
    setSimulations(payload.simulations);
  }
  return (
    <SimulationsContext.Provider
      value={{
        simulations,
        setSimulations,
        addSimulation,
        removeSimulation,
        loadFromPayload,
      }}
    >
      {children}
    </SimulationsContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useSimulations() {
  const context = useContext(SimulationsContext);
  if (context === undefined) {
    throw new Error("useSimulations must be used within a SimulationsProvider");
  }
  return context;
}
