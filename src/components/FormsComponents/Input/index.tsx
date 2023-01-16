interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  children?: React.ReactNode;
  containerStyle?: string;
}

export default function Input({
  label,
  children,
  containerStyle,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col">
      {label && <p className="text-sm mb-1">{label}</p>}
      <div
        className={`border-[1px] border-neutral-200 rounded-2xl  inputContainer overflow-hidden focus-within:border-primary-900 flex items-center w-full bg-transparent pl-4 transition-colors duration-200 ${containerStyle}`}
      >
        {children}

        <input
          className="outline-none p-2 py-4 w-full bg-transparent "
          {...props}
        />
      </div>
    </div>
  );
}
