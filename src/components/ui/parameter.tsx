// components/ParameterInput.tsx
interface ParameterInputProps {
  label: string;
  value: number;
  unit?: string;
  width?: string;
  onChange: (value: number) => void;
}

export function ParameterInput({
  label,
  value,
  unit,
  width = "w-[120px]",
  onChange,
}: ParameterInputProps) {
  return (
    <label className="flex flex-col">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={`${width} bg-gray-100 p-2 border border-gray-300 rounded-md`}
        />
        {unit && <span className="ml-2 text-gray-500">{unit}</span>}
      </div>
    </label>
  );
}
