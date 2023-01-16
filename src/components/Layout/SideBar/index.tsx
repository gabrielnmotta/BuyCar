import { getAuth, signOut } from "firebase/auth";
import { ArrowLeft2, ArrowRight2, Chart1, Icon, MessageText, Mirror, MoneyRecive, People, Personalcard } from "iconsax-react";
import { useRouter } from "next/router";
import Button from "../../FormsComponents/Button";
import MenuItem from "./MenuItem";

const SideBar = () => {
  const router = useRouter();

    const auth = getAuth();
    signOut(auth).then(() => {
      
    }).catch((error) => {
      // An error happened.
    });
  
  return (
    <nav className="flex flex-col w-40 max-w-[10rem] h-full border-r-[1px] border-neutral-200 pt-8 ">
      <p className="text-body ml-4 mb-3">Menu</p>
      <div className="flex gap-6 flex-col w-full ml-2">
        {arrMenu.map((item, index) => (
          <MenuItem item={item} key={index} />
        ))}
      </div>
      <p className="text-body ml-4 mb-3 mt-8">Outros</p>
      <div className="flex gap-6 flex-col w-full ml-2">
        {arrHelp.map((item, index) => (
          <MenuItem item={item} key={index} />
        ))}
      </div>

    </nav>
  );
};

export default SideBar;

export interface ArrMenuI {
  route: string;
  Icon: Icon;
  label: string;
}

const arrMenu: ArrMenuI[] = [
  {
    route: "/userAccess",
    Icon: Personalcard,
    label: "Financiados",
  },
  {
    route: "/othersAccess",
    Icon: MoneyRecive,
    label: "Financiar",
  },
  
];

const arrHelp: ArrMenuI[] = [
  {
    route: "/",
    Icon: ArrowLeft2,
    label: "Sair",
  },
];
