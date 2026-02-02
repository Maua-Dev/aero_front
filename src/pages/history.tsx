import React from "react";
import logo from "../assets/logo.png";
import lupa from "../assets/lupa.png";
import casa from "../assets/casa.png";
import aviao from "../assets/aviao.webp";
import { Link } from "react-router-dom";
import { useAllSimulation } from "@/hooks/use_simulation";

const Historico: React.FC = () => {
  const { data: simulations, isLoading, isError } = useAllSimulation();

  if (isLoading) {
    return <div>Carregando simulações...</div>;
  }
  if (isError) {
    return <div>Erro ao carregar simulações.</div>;
  }
  console.log(simulations);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* logo */}
      <img
        src={logo}
        alt="IMT AeroDesign Logo"
        className="absolute top-10 left-20 w-30 h-30"
      />
      {/* quadrado branco para o filtro */}
      <div className="absolute left-10 top-43 bg-white border-gray-300 rounded-2xl p-6 shadow-2xl w-50 h-75">
        <h1 className="text-2xl text-blue-900 font-bold">Filtros</h1>

        <h2 className="text-blue-950 text-xl absolute left-7 top-16">Datas</h2>

        <h3 className="absolute left-6 top-26">De: </h3>
        <h4 className="w-40 h-8 absolute top-32 left-6 bg-gray-200 border rounded-lg"></h4>

        <h3 className="absolute left-6 top-40">Até: </h3>
        <h4 className="w-40 h-8 absolute top-46 left-6 bg-gray-200 border rounded-lg"></h4>

        <h6 className="cursor-pointer text-lg text-center py-1 hover:bg-blue-900 bg-blue-800 text-white rounded-full h-10 w-40 absolute top-60 left-5 shadow-lg ">
          Limpar Filtros
        </h6>
      </div>
      {/* icones de projetos, feitos com ajuda de IA */}
      <div className="grid grid-cols-3 gap-15 p-6 absolute top-30 left-70">
        <div className="bg-white rounded-lg shadow p-2">
          <img src={aviao} className="w-70 h-50 object-cover rounded-md mb-2" />
          <h3 className="text-sm font-semibold text-gray-800">Simulação I</h3>
          <p className="text-xs text-gray-500">Em breve</p>
        </div>

        <div className="bg-white rounded-lg shadow p-2">
          <div className="h-50 w-70 bg-gray-200 rounded-md mb-2"></div>
          <h3 className="text-sm font-semibold text-gray-800">Simulação II</h3>
          <p className="text-xs text-gray-500">Em breve</p>
        </div>

        <div className="bg-white rounded-lg shadow p-2">
          <div className="h-50 w-70 bg-gray-200 rounded-md mb-2"></div>
          <h3 className="text-sm font-semibold text-gray-800">Simulação III</h3>
          <p className="text-xs text-gray-500">Em breve</p>
        </div>

        <div className="bg-white rounded-lg shadow p-2">
          <div className="h-50 w-70 bg-gray-200 rounded-md mb-2"></div>
          <h3 className="text-sm font-semibold text-gray-800">Simulação VI</h3>
          <p className="text-xs text-gray-500">Em breve</p>
        </div>

        <div className="bg-white rounded-lg shadow p-2">
          <div className="h-50 w-70 bg-gray-200 rounded-md mb-2"></div>
          <h3 className="text-sm font-semibold text-gray-800">Simulação VI</h3>
          <p className="text-xs text-gray-500">Em breve</p>
        </div>

        <div className="bg-white rounded-lg shadow p-2">
          <div className="h-50 w-70 bg-gray-200 rounded-md mb-2"></div>
          <h3 className="text-sm font-semibold text-gray-800">Simulação VII</h3>
          <p className="text-xs text-gray-500">Em breve</p>
        </div>
      </div>

      {/* barra de pesquisa n funcional */}
      <div className="absolute left-80 top-8 bg-gray-200  rounded-full p-2 w-250 h-10">
        <div className="font-semibold absolute right-215">Pesquisar...</div>
        <h2>
          <img src={lupa} className="w-10 h-10 absolute top-0" />
        </h2>
      </div>
      {/*botão do Home */}
      <Link
        to="/"
        className="cursor-pointer hover:bg-blue-900 bg-blue-800 text-white rounded-full h-15 w-40 absolute top-165 left-10 "
      >
        {" "}
        <h1 className="text-2xl font-bold absolute left-5 top-3">Home</h1>
        <img src={casa} className="w-10 h-10 absolute left-25 top-2" />
      </Link>
    </div>
  );
};

export default Historico;
