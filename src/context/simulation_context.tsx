import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { SimulationParams } from "@/types/simulation";

export interface Simulation {
  simulationId: number;
  simulationParams: SimulationParams;
}

export interface SimulationsPayload {
  simulations: Simulation[];
  message?: string;
}

export interface SimulationsContextValue {
  simulations: Simulation[];
  setSimulations: (simulations: Simulation[]) => void;
  addSimulation: (simulation: Simulation) => void;
  removeSimulation: (simulationId: number) => void;
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
  function removeSimulation(simulationId: number) {
    setSimulations((prev) =>
      prev.filter((s) => s.simulationId !== simulationId),
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
