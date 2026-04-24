import type { SimulationParams } from "@/types/simulation";
import { NumberField } from "../../components/ui/number_flied";
import { graphicFields } from "@/config/simulation_field";

interface Props {
  params: SimulationParams;
  onChange: (field: keyof SimulationParams, value: number) => void;
}

export function GraphAdjustmentPanel({ params, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {graphicFields.map(({ key, label, unit }) => (
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
