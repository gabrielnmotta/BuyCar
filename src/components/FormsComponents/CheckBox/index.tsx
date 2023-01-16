interface CheckBoxI extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  active: boolean;
  containerStyle?: React.HTMLAttributes<HTMLButtonElement> | string;
  children?: React.ReactNode;
}

const CheckBox = ({
  title,
  active,
  containerStyle,
  children,
  ...props
}: CheckBoxI) => {
  return (
    <div className="flex cursor-pointer items-center gap-2" {...props}>
      <div
        className={`w-7 h-7 min-w-[1.75rem] rounded-full transition-all flex items-center justify-center text-neutral-0  ${
          active
            ? "bg-primary-900 border-primary-300 border-[4px]  "
            : "bg-neutral-0 border-primary-900 border-[2px]  "
        } ${containerStyle}`}
      >
        {children}
      </div>
      <p>{title}</p>
    </div>
  );
};

export default CheckBox;
