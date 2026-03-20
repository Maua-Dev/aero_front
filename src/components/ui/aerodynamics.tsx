import type { SimulationParams } from "@/types/simulation";
import { NumberField } from "../../components/ui/number_flied";
import { aerodinamicaFields } from "@/config/simulation_field";

interface Props {
  params: SimulationParams;
  onChange: (field: keyof SimulationParams, value: number) => void;
}

export function AerodinamicaPanel({ params, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {aerodinamicaFields.map(({ key, label, unit }) => (
        <NumberField
          key={key}
          label={label}
          value={params[key]}
          unit={unit}
          onChange={(v) => onChange(key, v)}
        />
      ))}
    </div>
  );
}
