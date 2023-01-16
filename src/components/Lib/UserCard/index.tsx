import { HTMLMotionProps, motion } from "framer-motion";
import { DotsThree } from "phosphor-react";

interface UserCardI extends HTMLMotionProps<"div"> {
  type: "technical" | "customer";
  name: string;
  data1: string | number;
  data2: string | number;
  image?: string;
  selected?: boolean;
}

const UserCard = ({
  type,
  name,
  data1,
  data2,
  image,
  selected,
  ...props
}: UserCardI) => {
  return (
    <motion.div
      className={`rounded-2xl overflow-hidden border-[1px]  transition-all hover:border-primary-900 cursor-pointer h-min ${
        selected ? "border-primary-900" : "border-neutral-100"
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      {...props}
    >
      <div className="bg-neutral-50 h-16 p-4 ">
        <DotsThree className="ml-auto" size={22} />
      </div>
      <div className="flex items-center flex-col gap-3 px-4 -mt-8 mb-4 text-center justify-center overflow-hidden">
        <img
          src={image}
          className="w-16 h-16 rounded-full bg-primary-300 border-none"
        />
        <h3 className="w-full whitespace-nowrap text-ellipsis overflow-hidden pb-3 border-b-[1px] border-neutral-100">
          {name}
        </h3>
        <div className="flex items-center gap-3 text-neutral-500 text-xs w-full">
          <p className="flex-1 ">
            {type === "technical" ? "Salário" : "Fazendas"}
          </p>
          <p className="flex-1 ">Projetos</p>
        </div>
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 bg-neutral-50 py-1 rounded-full">
            <p className="text-success-primary">{data1}</p>
          </div>
          <div className="flex-1 bg-neutral-50 py-1 rounded-full">
            <p className="text-highlight-primary">{data2}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
