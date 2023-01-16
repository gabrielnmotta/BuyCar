import { useEffect, useRef, useState } from "react";
import { MagnifyingGlass, X } from "phosphor-react";

interface SearchProps {
  label?: string;
  containerStyle?: string;
  placeholder?: string;
  list: any[];
  optionKey: string;
  optionValue: string;
  returnItem: (o: any) => void;
  maxHeight?: number;
  subtitle?: string;
  required?: boolean;
  initialValue?: string;
  disabled?: boolean;
}

export default function Search({
  label,
  containerStyle,
  list,
  optionKey,
  optionValue,
  returnItem,
  maxHeight = 10,
  placeholder,
  subtitle,
  required,
  initialValue,
  disabled,
}: SearchProps) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const ref: any = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: any) => {
    if (!ref?.current?.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (initialValue) setValue(initialValue);
  }, []);

  const filteredList =
    value.length > 0
      ? list?.filter((item) =>
          item[optionValue].toLowerCase().includes(value.toLowerCase())
        )
      : list;

  return (
    <div className="flex flex-col relative " ref={ref}>
      <div className="flex items-center justify-between">
        {label && <p className="text-sm mb-2">{label}</p>}
        {subtitle && (
          <p className="text-sm mb-2 text-neutral-500">{subtitle}</p>
        )}
      </div>
      <div
        className={`border-[1px] border-neutral-200 overflow-hidden focus-within:border-primary-900 flex items-center w-full  pl-4  rounded-2xl ${containerStyle} ${
          disabled ? "bg-neutral-100" : "bg-transparent"
        }`}
      >
        <MagnifyingGlass />

        <input
          className="outline-none p-2 w-full bg-transparent "
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />

        {!disabled && (
          <X
            className="mr-3 cursor-pointer hover:text-primary-900"
            onClick={() => setValue("")}
          />
        )}
      </div>

      {open && filteredList.length > 0 && (
        <div
          className={
            "absolute top-full mt-2 z-50 left-0 flex-col shadow-sm overflow-auto w-full rounded-2xl bg-neutral-0 flex border-[1px] border-neutral-200 scrollbar"
          }
          style={{ maxHeight: maxHeight + "rem" }}
        >
          {filteredList.map((item) => (
            <p
              key={item[optionKey]}
              className="p-2 border-b-[1px] border-t-neutral-100 hover:bg-neutral-200 cursor-pointer last:border-b-0 "
              onClick={() => {
                setValue(item[optionValue]);
                setOpen(false);
                returnItem(item);
              }}
            >
              {item[optionValue]}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
