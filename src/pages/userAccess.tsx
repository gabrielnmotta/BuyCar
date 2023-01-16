import Card from "../components/Lib/Card/Card";
import SearchRow from "../components/UserAccessComponents/SearchRow";
import UserList from "../components/UserAccessComponents/UserList";
import useUserAccessContext from "../context/UserAccessContext";
import { useEffect, useState } from "react";

const UserAccess = () => {
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getAll, getApproved, getRepproved, getNotAwnsered } = useUserAccessContext()
  
  useEffect(() => {
     getApproved();
     getRepproved();
     getNotAwnsered(); 
     getAll();
   },[])

  return (
    <>
      <SearchRow
        search={(e) => setSearch(e)}
        
      />
      <UserList
      search={search}
      />
    </>
  );
};

export default UserAccess;
