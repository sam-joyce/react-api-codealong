import { ChangeEventHandler } from "react";
import "./RadioButtons.scss";

type RadioButtonProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  selected: string;
  options: string[];
  label: string;
};

const RadioButtons = ({
  onChange,
  selected,
  options,
  label,
}: RadioButtonProps) => {
  return (
    <div className="radio-buttons">
      <p>{label}</p>
      {options.map((option, index) => {
        const optionLower = option.toLowerCase();
        const optionCapitalized =
          optionLower[0].toUpperCase() + optionLower.slice(1);
        return (
          <div key={"radio-button" + option + index}>
            <input
              type="radio"
              name="gender"
              id={optionLower}
              value={optionLower}
              checked={optionLower === selected.toLowerCase()}
              onChange={onChange}
            />
            <label className="radio-buttons__label" htmlFor={optionLower}>
              {optionCapitalized}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioButtons;
