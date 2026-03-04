import { Minus, Plus } from "lucide-react";
import { calculateSubtotal, formatCurrency } from "@/lib/helper";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  unitPrice?: number;
  min?: number;
  className?: string;
}

export default function QuantitySelector({
  value,
  onChange,
  unitPrice,
  min = 1,
  className = "",
}: QuantitySelectorProps) {
  const canDecrease = value > min;
  const total =
    typeof unitPrice === "number" ? calculateSubtotal(unitPrice, value) : null;

  function handleDecrease() {
    if (!canDecrease) return;
    onChange(Math.max(min, value - 1));
  }

  function handleIncrease() {
    onChange(value + 1);
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={!canDecrease}
        aria-label="Decrease quantity"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300  hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="min-w-10 text-center text-sm font-medium">{value}</span>
      <button
        type="button"
        onClick={handleIncrease}
        aria-label="Increase quantity"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300  hover:bg-gray-400"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
      {total !== null && (
        <span className="text-sm">
          Total: <span className="font-semibold ">{formatCurrency(total)}</span>
        </span>
      )}
    </div>
  );
}