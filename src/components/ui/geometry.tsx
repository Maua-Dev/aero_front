import type { SimulationParams } from "@/types/simulation";
import { geometriaFields } from "@/config/simulation_field";
import { NumberField } from "../ui/number_flied";

interface Props {
  params: SimulationParams;
  onChange: (field: keyof SimulationParams, value: number) => void;
}

export function GeometriaPanel({ params, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {geometriaFields.map(({ key, label, unit }) => (
        <NumberField
          key={key}
          label={label}
          value={params[key] ?? 0}
          unit={unit}
          onChange={(v) => onChange(key, v)}
        />
      ))}
    </div>
  );
}
