interface InfoRowI {
  data: DataI[];
  variant?: boolean;
}

interface DataI {
  title?: string;
  info?: string;
}

const InfoRow = ({ data, variant }: InfoRowI) => {
  return (
    <div
      className={
        "flex w-full  " +
        (variant
          ? "justify-start gap-6 flex-col items-start"
          : "justify-between items-center")
      }
    >
      {data.map((item, index) => (
        <div key={index}>
          {item?.title && <p className="mb-2">{item?.title}</p>}
          <p className="text-3xl">{item?.info}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoRow;
