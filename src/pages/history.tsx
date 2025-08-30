import React from "react";
import logo from "../assets/logo.png";
import lupa from "../assets/lupa.png";
import casa from "../assets/casa.png";
import { Link } from "react-router-dom";

const Historico: React.FC = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* logo */}
      <img
        src={logo}
        alt="IMT AeroDesign Logo"
        className="absolute top-10 left-20 w-30 h-30"
      />
      {/* quadrado branco para o filtro */}
      <div className="absolute left-10 top-43 bg-white border-gray-300 rounded-2xl p-6 shadow-2xl w-50 h-70">
        <h1 className="text-xl font-bold">Filtros</h1>
      </div>
      {/* barra de pesquisa n funcional */}
      <div className="absolute left-80 top-8 bg-gray-200 border rounded-full p-2 w-250 h-10">
        <div className="font-semibold absolute right-215">Pesquisar...</div>
        <h2>
          <img src={lupa} className="w-10 h-10 absolute top-0" />
        </h2>
      </div>
      {/*botão do Home */}
      <Link
        to="/home"
        className="bg-blue-800 text-white rounded-full h-15 w-40 absolute top-165 left-10 "
      >
        {" "}
        <h1 className="text-2xl font-bold absolute left-5 top-3">Home</h1>
        <img src={casa} className="w-10 h-10 absolute left-25 top-2" />
      </Link>
    </div>
  );
};

export default Historico;
