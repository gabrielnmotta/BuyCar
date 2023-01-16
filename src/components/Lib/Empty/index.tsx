import { PushPin } from "phosphor-react";

interface EmptyI {
  text: string;
}

const Empty = ({ text }: EmptyI) => {
  return (
    <div className="flex-1 h-full flex flex-col items-center justify-center text-neutral-500 gap-4">
      <PushPin className=" bg-neutral-100 rounded-full p-2" size={42} />
      <p className="text-body ">{text}</p>
    </div>
  );
};

export default Empty;
