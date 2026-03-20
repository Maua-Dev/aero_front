import { useEffect, useState } from "react";

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
  const [text, setText] = useState(value.toString().replace(".", ","));

  // Mantém sincronizado quando o valor vem de fora (reset, load, etc)
  useEffect(() => {
    setText(value.toString().replace(".", ","));
  }, [value]);

  const handleChange = (raw: string) => {
    setText(raw);

    const normalized = raw.replace(",", ".");
    const parsed = Number(normalized);

    if (!Number.isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <label className="flex flex-col">
      <span className="text-sm font-medium text-gray-700">{label}</span>

      <div className="flex items-center">
        <input
          type="text"
          inputMode="decimal"
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          className="w-[120px] bg-gray-100 p-2 border border-gray-300 rounded-md
                     focus:ring-blue-500 focus:border-blue-500"
        />

        {unit && <span className="ml-2 text-gray-500">{unit}</span>}
      </div>
    </label>
  );
}
