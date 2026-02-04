import type { Simulation } from "@/context/simulation_context";
import { userMss } from "../http/api";
import type { SimulationParams } from "@/types/simulation";

export const SimulationService = {
  async getAllSimulations() {
    try {
      const response = await userMss.get("/get-all-cm-simulation");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todas as simulações:", error);
      throw error;
    }
  },

  async createSimulation(data: SimulationParams) {
    try {
      const response = await userMss.post("/create-cm-simulation", data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar simulação:", error);
      throw error;
    }
  },

  async deleteSimulation(simulationId: string) {
    try {
      const response = await userMss.delete(
        `/delete-cm-simulation?simulation_id=${simulationId}`,
        { headers: { "Content-Type": "application/json" } },
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar simulação:", error);
      throw error;
    }
  },

  async updateSimulation(data: Simulation) {
    try {
      const response = await userMss.put("/update-cm-simulation", data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar simulação:", error);
      throw error;
    }
  },

  async getSimulationById(simulationId: string) {
    try {
      const response = await userMss.get("/get-cm-simulation", {
        params: { simulation_id: simulationId },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar simulação por ID:", error);
      throw error;
    }
  },
};
