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
      const response = await userMss.post(
        "/delete-cm-simulation",
        {
          simulation_id: simulationId,
        },
        { headers: { "Content-Type": "application/json" } },
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar simulação:", error);
      throw error;
    }
  },

  async updateSimulation(simulationId: string, data: SimulationParams) {
    try {
      const response = await userMss.post(
        "/update-cm-simulation",
        {
          simulation_id: simulationId,
          updated_simulation: data,
        },
        { headers: { "Content-Type": "application/json" } },
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar simulação:", error);
      throw error;
    }
  },
};
