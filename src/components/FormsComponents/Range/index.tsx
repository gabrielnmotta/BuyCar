import { Icon } from "phosphor-react";

interface RangeI {
  data: any[];
  value: any;
  returnData: (data: any) => void;
  label?: string;
  containerStyle?: string;
  IconLeft: Icon;
  IconRight: Icon;
}

const Range = ({
  data,
  value,
  returnData,
  label,
  containerStyle,
  IconLeft,
  IconRight,
}: RangeI) => {
  const valueIndex = data.findIndex((item) => item === value);

  return (
    <div className="flex flex-col">
      {label && <p className="text-sm mb-2">{label}</p>}
      <div
        className={`border-[1px] border-neutral-200 rounded-2xl   overflow-hidden flex items-center w-full bg-transparent justify-between p-2 ${containerStyle}`}
      >
        <IconLeft
          className="cursor-pointer hover:text-primary-900"
          onClick={() => {
            valueIndex > 0 && returnData(data[valueIndex - 1]);
          }}
        />
        <p>{value}</p>
        <IconRight
          className="cursor-pointer hover:text-primary-900"
          onClick={() => {
            valueIndex < data.length - 1 && returnData(data[valueIndex + 1]);
          }}
        />
      </div>
    </div>
  );
};

export default Range;
