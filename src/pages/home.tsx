import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const LayoutHome: React.FC = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Triângulo inferior esquerdo */}
      <div
        className="absolute bottom-0 left-0 bg-orange-600"
        style={{
          width: "25vw",
          height: "65vh",
          clipPath: "polygon(0 100%, 100% 100%, 0 0)",
        }}
      />

      {/* Triângulo superior direito */}
      <div
        className="absolute top-0 right-0 bg-orange-600"
        style={{
          width: "25vw",
          height: "65vh",
          clipPath: "polygon(100% 0, 100% 100%, 0 0)",
        }}
      />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center gap-[5vh]">
        {/* Logo responsiva */}
        <img
          src={logo}
          alt="IMT AeroDesign Logo"
          style={{
            width: "20vw",
            height: "20vw",
            maxWidth: "300px",
            minWidth: "120px",
          }}
        />

        {/* Botão Nova Simulação */}
        <Link
          to="/nova-simulacao"
          className="bg-blue-800 text-white rounded-full text-center hover:bg-blue-900 transition"
          style={{
            padding: "1.5vh 4vw",
            fontSize: "1.5vw",
            minWidth: "15vw",
            borderRadius: "50vw",
          }}
        >
          Nova Simulação
        </Link>

        {/* Botão Histórico */}
        <Link
          to="/historico"
          className="bg-blue-800 text-white rounded-full text-center hover:bg-blue-900 transition"
          style={{
            padding: "1.5vh 6.5vw",
            fontSize: "1.5vw",
            minWidth: "15vw",
            borderRadius: "50vw",
          }}
        >
          Histórico
        </Link>
      </div>
    </div>
  );
};

export default LayoutHome;
