import Card from "../components/Lib/Card/Card";
import SearchRow from "../components/OthersAccessComponents/SearchRow";
import UserList from "../components/OthersAccessComponents/UserList";
import useOthersAccessContext from "../context/OthersAccessContext";
import { useEffect, useState } from "react";

const OthersAccess = () => {
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getAll, getApproved, getRepproved, getNotAwnsered } = useOthersAccessContext()
  
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

export default OthersAccess;
