interface NumberFieldProps {
  label: string;
  value: number;
  unit?: string;
  onChange: (value: number) => void;
}

export function NumberField({
  label,
  value,
  unit,
  onChange,
}: NumberFieldProps) {
  return (
    <label className="flex flex-col">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-[120px] bg-gray-100 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {unit && <span className="ml-2 text-gray-500">{unit}</span>}
      </div>
    </label>
  );
}
