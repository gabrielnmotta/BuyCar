import { Document } from "iconsax-react";
import { useRef, useState } from "react";

// na prop accept vc passa o tipo de arquivo que vc quer aceitar, na prop ID vc passa o id do input que precisa ser o mesmo do htmlFor do label

interface UploadFileProps {
  handleDoc: (e: File) => void;
}

export const UploadFile = ({ handleDoc }: UploadFileProps) => {
  const [doc, setDoc] = useState<File>();
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <div className="flex flex-col">
      <p className="text-typoHigh font-bold text-sm mb-1">Arquivo</p>
      <label
        htmlFor="example"
        className={
          "flex justify-between items-center border-[1px]  rounded-md p-2 text-typoHigh cursor-pointer " +
          (doc ? "border-buttonActive" : "border-dividerNormal")
        }
        ref={labelRef}
      >
        <button onClick={() => labelRef.current?.click()} type="button">
          {doc ? doc.name : "Clique para selecionar um arquivo"}
        </button>
        <Document className="text-typoHigh" />
      </label>
      <input
        type="file"
        id="example"
        name="example"
        accept="pdf"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            setDoc(e.target.files[0]);
            handleDoc(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};
