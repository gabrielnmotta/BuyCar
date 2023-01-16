interface FalseInputProps {
  label?: string;
  value?: any;
  children?: React.ReactNode;
  containerStyle?: string;
  disabled?: boolean;
}

export default function FalseInput({
  label,
  children,
  containerStyle,
  value,
  disabled,
}: FalseInputProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <div className="flex items-center justify-between">
          <p className="text-sm mb-2">{label}</p>
        </div>
      )}
      <div
        className={`border-[1px] border-neutral-200 rounded-2xl  inputContainer overflow-hidden focus-within:border-primary-900 flex items-center w-full  pl-4 transition-colors duration-200 h-full ${containerStyle} ${
          disabled ? "bg-neutral-100" : "bg-transparent"
        }  `}
      >
        {children}

        <p className="outline-none pl-1 p-2 w-full bg-transparent text-dots ">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}
