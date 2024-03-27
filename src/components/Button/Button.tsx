import { MouseEvent } from "react";
import "./Button.scss";

type ButtonProps = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
};

const Button = ({ onClick, label }: ButtonProps) => {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
