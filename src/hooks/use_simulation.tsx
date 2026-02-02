import { SimulationService } from "@/services/simulation";
import type { SimulationParams } from "@/types/simulation";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function useAllSimulation() {
  return useQuery({
    queryKey: ["allSimulations"],
    queryFn: async () => {
      const response = await SimulationService.getAllSimulations();
      return response;
    },
    retry: 2,
  });
}

export function useCreateSimulation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createSimulation"],
    mutationFn: async (data: SimulationParams) => {
      const response = await SimulationService.createSimulation(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSimulations"] });
    },
  });
}

export function useDeleteSimulation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (simulationId: string) => {
      return await SimulationService.deleteSimulation(simulationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSimulations"] });
      alert("Simulação excluída com sucesso!");
    },
    onError: (error) => {
      console.error(error);
      alert("Erro ao excluir simulação.");
    },
  });
}

export function useUpdateSimulation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      simulationId,
      data,
    }: {
      simulationId: string;
      data: SimulationParams;
    }) => {
      return await SimulationService.updateSimulation(simulationId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSimulations"] });
      alert("Simulação atualizada com sucesso!");
    },
    onError: (error) => {
      console.error(error);
      alert("Erro ao atualizar simulação.");
    },
  });
}
