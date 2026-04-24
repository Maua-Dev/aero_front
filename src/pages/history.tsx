import React, { useState } from "react";
import logo from "../assets/logo.png";
import casa from "../assets/casa.png";
import { Link, useNavigate } from "react-router-dom";
import { useAllSimulation, useDeleteSimulation } from "@/hooks/use_simulation";
import SimulationCard from "../components/ui/simulation_card";
import type { Simulation } from "@/context/simulation_context";
import CustomModal from "@/components/customModal";

const Historico: React.FC = () => {
  const [selectedDelete, setSelectedDelete] = useState<string | null>(null);
  const { data: simulations, isLoading, isError, refetch } = useAllSimulation();
  const deleteSimulationMutation = useDeleteSimulation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <body className="h-screen w-screen flex justify-center items-center">
        <div className="max-w-xs mx-auto gap-10 flex items-center justify-center">
          <div className="text-9xl duration-300 animate-bounce">.</div>
          <div
            className="text-9xl duration-300 animate-bounce"
            style={{ animationDelay: "150ms" }}
          >
            .
          </div>
          <div
            className="text-9xl duration-300 animate-bounce"
            style={{ animationDelay: "300ms" }}
          >
            .
          </div>
        </div>
      </body>
    );
  }
  if (isError) {
    return <div>Erro ao carregar simulações.</div>;
  }
  console.log(simulations.cm_simulations);

  const handleCardClick = (simulationId: string) => {
    // Navegar para os detalhes da simulação
    console.log("Clicou na simulação:", simulationId);
    navigate(`/simulacao/${simulationId}`);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-white overflow-hidden">
      <CustomModal
        isOpen={selectedDelete !== null}
        onClose={() => setSelectedDelete(null)}
        title={"Tem certeza que deseja excluir esta simulação?"}
        children={
          <div>
            <button
              onClick={() => {
                if (selectedDelete) {
                  deleteSimulationMutation.mutate(selectedDelete, {
                    onSuccess: () => {
                      refetch();
                    },
                  });
                  setSelectedDelete(null);
                }
              }}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            >
              Confirmar Exclusão
            </button>
          </div>
        }
      ></CustomModal>
      {/* logo */}
      <img
        src={logo}
        alt="IMT AeroDesign Logo"
        className="absolute top-3 left-4 w-35 h-35"
      />

      {/* quadrado branco para o filtro */}
      {/* <div className="absolute left-10 top-43 bg-white border-gray-300 rounded-2xl p-6 shadow-2xl w-50 h-75">
        <h1 className="text-2xl text-blue-900 font-bold">Filtros</h1>

        <h2 className="text-blue-950 text-xl absolute left-7 top-16">Datas</h2>

        <h3 className="absolute left-6 top-26">De: </h3>
        <h4 className="w-40 h-8 absolute top-32 left-6 bg-gray-200 border rounded-lg"></h4>

        <h3 className="absolute left-6 top-40">Até: </h3>
        <h4 className="w-40 h-8 absolute top-46 left-6 bg-gray-200 border rounded-lg"></h4>

        <h6 className="cursor-pointer text-lg text-center py-1 hover:bg-blue-900 bg-blue-800 text-white rounded-full h-10 w-40 absolute top-60 left-5 shadow-lg ">
          Limpar Filtros
        </h6>
      </div> */}

      {/* Grid de simulações com componente reciclável */}
      <div className="min-h-screen pl-40 pr-5">
        <div className="mt-2 w-full max-w-6xl h-[100vh] overflow-y-auto mx-auto">
          <div className="grid grid-cols-3 gap-15 p-6">
            {simulations.cm_simulations.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500">
                Nenhuma simulação encontrada.
              </div>
            ) : (
              simulations.cm_simulations.map(
                (simulation: Simulation, index: number) => (
                  <SimulationCard
                    key={simulation.simulation_id || index}
                    title={
                      simulation.simulation_id
                        ? `Simulação ${simulation.simulation_id}`
                        : `Simulação ${index + 1}`
                    }
                    simulation={simulation}
                    onClick={() =>
                      simulation.simulation_id &&
                      handleCardClick(simulation.simulation_id)
                    }
                    onDelete={(id: string) => setSelectedDelete(id)}
                  />
                ),
              )
            )}
          </div>
        </div>
      </div>
      {/* barra de pesquisa n funcional */}
      {/* <div className="absolute left-80 top-8 bg-gray-200 rounded-full p-2 w-250 h-10">
        <div className="font-semibold absolute right-215">Pesquisar...</div>
        <h2>
          <img src={lupa} className="w-10 h-10 absolute top-0" />
        </h2>
      </div> */}

      {/*botão do Home */}
      <Link
        to="/"
        className="cursor-pointer hover:bg-blue-900 bg-blue-800 text-white rounded-full h-15 w-40 absolute top-45 left-3"
      >
        {" "}
        <h1 className="text-2xl font-bold absolute left-5 top-3">Home</h1>
        <img src={casa} className="w-10 h-10 absolute left-25 top-2" />
      </Link>
    </div>
  );
};

export default Historico;
