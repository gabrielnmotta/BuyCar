interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string;
  children: React.ReactNode;
  containerStyle?: string;
  subtitle?: string;
}

const Select = ({
  label,
  children,
  containerStyle,
  subtitle,
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        {label && <p className="text-sm mb-2">{label}</p>}
        {subtitle && (
          <p className="text-sm mb-2 text-neutral-500">{subtitle}</p>
        )}
      </div>

      <div
        className={`border-[1px] border-neutral-100 rounded-xl  overflow-hidden focus-within:border-primary-900 w-full bg-transparent pr-2 ${containerStyle}`}
      >
        <select
          className="outline-none p-2 w-full bg-transparent py-3"
          {...props}
        >
          {children}
        </select>
      </div>
    </div>
  );
};

export default Select;
