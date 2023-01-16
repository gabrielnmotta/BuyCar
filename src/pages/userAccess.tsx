import Card from "../components/Lib/Card/Card";
import SearchRow from "../components/UserAccessComponents/SearchRow";
import UserList from "../components/UserAccessComponents/UserList";
import useUserAccessContext from "../context/UserAccessContext";
import { useEffect, useState } from "react";
import FormBuy from "../components/InfoBuy/FormBuy";

const UserAccess = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <FormBuy />
    </>
  );
};

export default UserAccess;
