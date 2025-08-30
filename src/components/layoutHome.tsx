import React from 'react'; 
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const LayoutHome: React.FC = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Barra laranja esquerda */}
    <div
      className="absolute bottom-0 left-0 bg-orange-600"
      style={{
        width: '600px',
        height: '600px',
        clipPath: 'polygon(0 100%, 100% 100%, 0 0)', // Triângulo alinhado no canto inferior esquerdo
     }}
    ></div>


      {/* Barra laranja direita (espelhada) */}
      <div
        className="absolute top-0 right-0 bg-orange-600"
        style={{
          width: '600px',
          height: '600px',
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
        }}
      ></div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        <img src={logo} alt="IMT AeroDesign Logo" className="w-80 h-80" />
        <Link
          to="/nova-simulacao"
          className="bg-blue-800 text-white rounded-full px-26 py-4 min-w-[220px] text-center hover:bg-blue-900 transition text-[30px]"
        >
          Nova Simulação
        </Link>
        <Link
          to="/historico"
          className="bg-blue-800 text-white rounded-full px-38 py-4 min-w-[220px] text-center hover:bg-blue-900 transition text-[30px]"
        >
          Histórico
        </Link>
      </div>
    </div>
  );
};

export default LayoutHome;
