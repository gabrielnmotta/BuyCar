import { Image, X } from "phosphor-react";
import { useRef, useState } from "react";

interface UploadImageI extends React.InputHTMLAttributes<HTMLInputElement> {
  handleImage: (e: File | null) => void;
  label?: string;
  subtitle?: string;
  containerStyle?: string;
  imgSize?: React.CSSProperties;
  divStyle?: string;
}

const UploadImage = ({
  handleImage,
  label,
  subtitle,
  containerStyle,
  imgSize,
  divStyle,
  ...props
}: UploadImageI) => {
  const [doc, setDoc] = useState<File | null>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <div className={`flex flex-col h-full ${divStyle}`}>
      <div className="flex items-center justify-between">
        {label && <p className="text-sm mb-2">{label}</p>}
        {subtitle && (
          <p className="text-sm mb-2 text-neutral-500">{subtitle}</p>
        )}
      </div>
      <div className={containerStyle}>
        <div
          className="border-[1px] border-neutral-200 rounded-full h-16 w-16 flex items-center justify-center relative"
          style={imgSize}
        >
          <label htmlFor="imageBase64" ref={labelRef}>
            {doc ? (
              <img
                src={URL.createObjectURL(doc)}
                alt="doc"
                className="rounded-full h-16 w-16"
                style={imgSize}
              />
            ) : (
              <Image className="text-neutral-500 text-3xl cursor-pointer hover:text-primary-900" />
            )}
          </label>
          <input
            type="file"
            id="imageBase64"
            name="imageBase64"
            accept=""
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                setDoc(e.target.files[0]);
                handleImage(e.target.files[0]);
              }
            }}
            {...props}
          />
          {doc && (
            <div
              className="w-4 h-4 bg-critical-primary text-neutral-0 rounded-full absolute right-0 top-0 cursor-pointer"
              onClick={() => {
                setDoc(null);
                handleImage(null);
              }}
            >
              {" "}
              <X className="p-1" />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
