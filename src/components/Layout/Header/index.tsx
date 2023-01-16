import { ArrowLeft, Calendar } from "iconsax-react";
import moment from "moment";
import "moment/locale/pt-br";
import { useRouter } from "next/router";
import useAuthContext from "../../../context/Auth";

const Header = () => {
  const router = useRouter();
  const { header, setHeader } = useAuthContext();

  return (
    <header className="w-full min-h-[5rem] h-20 overflow-hidden flex border-b-[1px] border-neutral-200">
      <div className="h-full w-40 bg-primary-900">
        <img src="/Layout/logo.png" alt="Burgi" className="w-full h-auto p-2" />
      </div>
      <div className="flex-1 flex items-center justify-between px-8">
        <div className="flex items-center gap-2 text-title4">
          {header.headerType == "main" ? (
            <>
              <Calendar />
              <h1 className="font-medium">{moment().format("LL")}</h1>
            </>
          ) : (
            <div
              className="cursor-pointer hover:text-primary-900 flex items-center gap-2 transition-all"
              onClick={() => {
                router.back(), setHeader({ headerType: "main" });
              }}
            >
              <ArrowLeft />
              <h1 className="font-medium">{header.title}</h1>
            </div>
          )}
        </div>

        {/* <div className="flex gap-3 items-center">
          <div>
            <p className="text-body leading-5">Guilherme</p>
            <p className="text-footnote text-primary-900">guilherme@burgi.com.br</p>
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
