interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  subtitle?: string;
  children?: React.ReactNode;
  containerStyle?: string;
  inputStyle?: string;
  componentStyle?: string;
}

export default function Input({
  label,
  children,
  containerStyle,
  subtitle,
  inputStyle,
  componentStyle,
  ...props
}: InputProps) {
  return (
    <div className={`flex flex-col ${componentStyle}`}>
      <div className="flex items-center justify-between">
        {label && <p className="text-sm mb-2">{label}</p>}
        {subtitle && (
          <p className="text-sm mb-2 text-neutral-500">{subtitle}</p>
        )}
      </div>
      <div
        className={`border-[1px] border-neutral-200 rounded-2xl  inputContainer overflow-hidden focus-within:border-primary-900 flex items-center w-full transition-colors duration-200 ${containerStyle} ${
          props.disabled ? "bg-neutral-100" : "bg-transparent"
        } `}
      >
        {children && <div className="pl-2">{children}</div>}

        <input
          className={`outline-none pl-2 p-2 w-full bg-transparent ${inputStyle}`}
          {...props}
        />
      </div>
    </div>
  );
}
