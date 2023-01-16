interface TableI {
    data: any[];
    listInfos: listI[];
    subtitleContainerStyle?: React.CSSProperties;
    rowContainerStyle?: React.CSSProperties;
  }
  
  interface listI {
    subtitle: string;
    style?: React.CSSProperties;
    dataKey?: string;
    element?: (listRowInfo: any) => JSX.Element;
    mask?: (rowItem: any) => string;
  }
  
  const Table = ({
    data,
    listInfos,
    subtitleContainerStyle,
    rowContainerStyle,
  }: TableI) => {
    return (
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Legenda */}
        <div
          className="flex items-center p-2 w-full border-b-[1px] border-b-neutral-100 font-medium text-neutral-700 gap-2 sticky top-0  "
          style={subtitleContainerStyle}
        >
          {listInfos.map((item, index) => (
            <p className="flex-1" key={item.subtitle} style={item.style}>
              {item.subtitle}
            </p>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto scrollbar">
          {/* Rows */}
          {data.map((item, index) => (
            <div
              className="flex items-center p-2 w-full text-neutral-900 gap-2 border-b-[1px] border-neutral-100 py-2 scrollbar"
              style={rowContainerStyle}
              key={index}
            >
              {listInfos.map((options, index) => {
                if (options.dataKey)
                  return (
                    <p className="flex-1 text-ellipsis" style={options.style}>
                      {options.mask
                        ? options.mask(item[options.dataKey as keyof typeof item])
                        : item[options.dataKey as keyof typeof item]}
                    </p>
                  );
                else if (options.element)
                  return (
                    <div className="flex-1" style={options.style}>
                      {options.element(item)}
                    </div>
                  );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };
  export default Table;
  