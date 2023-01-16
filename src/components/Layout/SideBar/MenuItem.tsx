import { useRouter } from "next/router";
import { ArrMenuI } from ".";

interface MenuItemI {
  item: ArrMenuI;
}

const MenuItem = ({ item }: MenuItemI) => {
  const router = useRouter();
  return (
    <div
      className={
        "flex w-full cursor-pointer transition-all items-center justify-start " +
        (router.pathname === item.route
          ? "text-primary-1100 font-semibold"
          : "text-neutral-600 hover:text-primary-900")
      }
      onClick={() => router.push(item.route)}
    >
      <span
        className={
          "mr-2 h-full rounded-full w-1 transition-all delay-200 bg-primary-1100 " +
          (router.pathname === item.route ? "opacity-100" : "opacity-0")
        }
      />
      <item.Icon />
      <p className="text-base ml-2 flex-1">{item.label}</p>
    </div>
  );
};

export default MenuItem;
