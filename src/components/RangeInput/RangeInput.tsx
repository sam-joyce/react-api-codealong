import { ChangeEventHandler } from "react";
import "./RangeInput.scss";

type RangeInputProps = {
  min: number;
  max: number;
  label: string;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: number;
};

const RangeInput = ({
  min = 1,
  max = 10,
  label,
  id,
  onChange,
  value,
}: RangeInputProps) => {
  return (
    <div className="range-input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default RangeInput;
