import Card from "../components/Lib/Card/Card";
import SearchRow from "../components/PartnersAccessComponents/SearchRow";
import UserList from "../components/PartnersAccessComponents/UserList";
import usePartnersAccessContext from "../context/PartnersAccessContext";
import { useEffect, useState } from "react";

const PartnersAccess = () => {
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getAll, getApproved, getRepproved, getNotAwnsered } = usePartnersAccessContext()
  
  useEffect(() => {
     getApproved();
     getRepproved();
     getNotAwnsered(); 
     getAll();
   },[])

  return (
    <Card containerStyle="flex-1 overflow-y-hidden">
      <SearchRow
        search={(e) => setSearch(e)}
        
      />
      <UserList
      search={search}
      
      />
    </Card>
  );
};

export default PartnersAccess;
