import { CloseCircle } from "iconsax-react";

interface CardModalI {
  children: React.ReactNode;
  containerStyle?: string;
  title: string;
  subtitle?: string;
  closeModal: () => void;
  bottomBar: React.ReactNode;
}

const CardModal = ({
  children,
  containerStyle,
  title,
  subtitle,
  closeModal,
  bottomBar,
}: CardModalI) => {
  return (
    <div className={`${containerStyle} `}>
      <div className="text-neutral-200 bg-primary-1100 px-8 py-6 ">
        <div className=" flex items-center justify-between">
          <h1 className="text-title4">{title}</h1>
          <CloseCircle
            variant="Bold"
            size={32}
            onClick={closeModal}
            className="text-primary-200 cursor-pointer"
          />
        </div>
        <h4 className="text-body mt-2">{subtitle}</h4>
      </div>

      <div className="px-8 py-6 bg-neutral-0">{children}</div>

      <div className="border-t-[1px] border-neutral-200 px-8 py-6 flex items-center justify-end gap-6 bg-neutral-0">
        {bottomBar}
      </div>
    </div>
  );
};

export default CardModal;
