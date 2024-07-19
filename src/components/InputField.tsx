import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  ReactNode,
} from "react";
import { Input } from "./ui/input";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

interface InputFieldProps {
  type?: string;
  id?: string;
  value: string;
  dir?: "left" | "right";
  placeholder?: string;
  icon?: IconType;
  containerClassName?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

function InputField({
  type = "text",
  id,
  value,
  dir = "left",
  placeholder,
  icon: Icon,
  onKeyDown,
  containerClassName,
  onChange,
  onBlur,
}: InputFieldProps) {
  return (
    <div
      className={twMerge(
        "row-flex-start border-input ring-offset-background focus-visible:ring-ring relative w-full !justify-start gap-1 rounded-md border shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 group-[.is-error]:border-none",
        containerClassName,
        Icon && "gap-1.5 px-2",
      )}
    >
      {dir === "left" && Icon && (
        <span className="icon leading-none">
          <Icon size={20} className="" />
        </span>
      )}
      <Input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={twMerge("i-reset flex-1 rounded-none")}
      />
      {dir === "right" && Icon && (
        <span className="icon leading-none">
          <Icon size={20} className="" />
        </span>
      )}
    </div>
  );
}

export default InputField;
