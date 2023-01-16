import { Icon } from "iconsax-react";

interface CardWTitleI {
  children?: React.ReactNode;
  title: string;
  Icon: Icon;
  containerStyle?: string;
  variant?: boolean;
}

const CardWTitle = ({
  children,
  title,
  Icon,
  containerStyle,
  variant,
}: CardWTitleI) => {
  return (
    <div
      className={`bg-neutral-0 rounded-2xl p-6 shadow flex flex-col ${containerStyle}`}
    >
      <div className="flex items-center border-b-[1px] border-neutral-100 pb-3 mb-3 justify-between">
        <div className="flex items-center gap-3">
          <Icon />
          <h3 className="text-lg">{title}</h3>
        </div>
        {variant && (
          <div className="flex items-center gap-2">
            <p>Média</p>
            <div className="w-[1rem] h-[1rem] bg-primary-300 mr-2" />
            <p>Limite</p>
            <div className="w-[1rem] h-[1rem] bg-primary-600" />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default CardWTitle;
