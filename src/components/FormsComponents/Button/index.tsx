import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title?: string;
  empty?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  children?: React.ReactNode;
  containerStyle?: React.HTMLAttributes<HTMLButtonElement> | string;
}

export default function Button({
  title,
  children,
  containerStyle,
  empty = false,
  size = "medium",
  disabled = false,
  ...props
}: ButtonProps) {
  let emptyStyle = empty
    ? "bg-transparent text-primary-900 hover:text-primary-800 hover:border-primary-800 "
    : "bg-primary-900 text-neutral-0 hover:bg-primary-800 active:bg-button-1000 ";

  let sizeStyle =
    size === "small"
      ? "p-2 text-sm "
      : size === "large"
      ? "p-3 text-lg "
      : "p-[10px] text-base ";

  let disabledStyle = disabled
    ? "cursor-not-allowed text-neutral-500 border-neutral-200 hover:border-neutral-200 hover:text-neutral-500 " +
      (!empty ? " bg-neutral-200 hover:bg-neutral-200 " : " ")
    : " ";

  return (
    <button
      className={`flex items-center justify-center rounded-2xl gap-3 transition-all text-center border-[1px] border-primary-900 hover:border-primary-800 active:border-button-1000 ${emptyStyle} ${sizeStyle} ${disabledStyle} ${containerStyle}`}
      {...props}
    >
      {title && <p>{title}</p>}
      {children}
    </button>
  );
}
