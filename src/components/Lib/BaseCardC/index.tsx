import { HTMLAttributes } from "react";

interface BaseCardI extends HTMLAttributes<HTMLDivElement> {
  containerStyle?: string;
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

const BaseCardC = ({
  containerStyle,
  size = "small",
  children,
  ...props
}: BaseCardI) => {
  let padding = "p-4";
  if (size === "small") padding = "p-2";
  else if (size === "large") padding = "p-6";

  return (
    <div
      className={`rounded-2xl border-[1px] border-neutral-200 flex flex-col transition-all ${containerStyle} ${padding} `}
      {...props}
    >
      {children}
    </div>
  );
};

export default BaseCardC;
