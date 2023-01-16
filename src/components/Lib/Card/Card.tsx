interface CardI {
  children: React.ReactNode;
  containerStyle?: string;
}

const Card = ({ children, containerStyle }: CardI) => {
  return (
    <div
      className={`bg-neutral-0 rounded-2xl p-6 shadow flex flex-col ${containerStyle}`}
    >
      {children}
    </div>
  );
};

export default Card;
