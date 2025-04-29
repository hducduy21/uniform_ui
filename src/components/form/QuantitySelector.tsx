import { ChevronDown } from "lucide-react";

type QuantitySelectorProps = {
    value: number;
    onChange: (value: number) => void;
}

const QuantitySelector = (props: QuantitySelectorProps) => {
    return (
        <div className="relative w-32">
            <select
                value={props.value}
                onChange={(e) => props.onChange(Number.parseInt(e.target.value))}
                className="w-full py-2 pl-3 pr-8 border border-gray-300 appearance-none"
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                    {num}
                </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown size={16} />
            </div>
            </div>
    );
}

export default QuantitySelector;