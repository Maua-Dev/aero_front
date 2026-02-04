// components/SimulationCard.tsx
import React from "react";

interface SimulationCardProps {
  id?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  date?: string;
  hasImage?: boolean;
  onClick?: () => void;
}

const SimulationCard: React.FC<SimulationCardProps> = ({
  title,
  description = "Em breve",
  imageUrl,
  hasImage = true,
  date,
  onClick,
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow p-2 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      {hasImage && imageUrl ? (
        <img
          src={imageUrl}
          className="w-70 h-50 object-cover rounded-md mb-2"
          alt={`Imagem da ${title}`}
        />
      ) : hasImage ? (
        <div className="h-50 w-70 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
          <span className="text-gray-400">Sem imagem</span>
        </div>
      ) : null}

      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <p className="text-xs text-gray-500">{description}</p>

      {date && (
        <p className="text-xs text-gray-400 mt-1">
          {new Date(date).toLocaleDateString("pt-BR")}
        </p>
      )}
    </div>
  );
};

export default SimulationCard;
