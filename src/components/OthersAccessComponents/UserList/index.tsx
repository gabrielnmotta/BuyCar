import Table from "../../../components/Lib/Table";
import useOthersAccessContext from "../../../context/OthersAccessContext";
import { UserI } from "../../../context/OthersAccessContext/type";
import { Dislike, Edit, Like1 } from "iconsax-react";
import moment from "moment";
import { cpfMask, phoneMask } from "../../../utils/masks";
import { collection, doc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../services/firebaseConfig";
import { useDebugValue, useEffect, useState } from "react";

const UserList = ({ search }: { search: string }) => {
  const { allList, approvedList, repprovedList, notAwnseredList, userType } = useOthersAccessContext();
  const [list, setList] = useState<UserI[]>([])

const filteredList =
    search?.length > 0
      ? list.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.cpf.toLowerCase().includes(search.toLowerCase()) 
        )
      : list;

const setTrue = async(id) => {
    const colRef = doc(db, 'others', id);
    updateDoc(colRef, { approved: true });
}

const setFalse = async(id) => {
   const colRef = doc(db, 'others', id);
   updateDoc(colRef, { approved: false });
}

  useEffect(()=> {
    if (userType == "approved"){
      setList(approvedList)
    } 
    if (userType == "reproved"){
      setList(repprovedList)
    } 
    if (userType == "not_awnsered"){
      setList(notAwnseredList)
    } 
    if (userType == "all"){
      setList(allList)
    } 
  },[userType,
    approvedList,
    repprovedList,
    notAwnseredList,
    allList])
 
  const NameCPF = ({ data }: { data: UserI }) => {
    return (
      <div className="flex flex-col flex-1">
        <p className="-mb-1 overflow-hidden text-ellipsis">{data.name}</p>
        <p className="text-sm -mb-1 overflow-hidden text-ellipsis capitalize">
          {cpfMask(data.cpf)}
        </p>
      </div>
    );
  };

  const CityUF = ({ data }: { data: UserI }) => {
    return (
      <div className="flex flex-col flex-1">
        <p className="-mb-1 overflow-hidden text-ellipsis">{data.city}</p>
        <p className="text-sm -mb-1 overflow-hidden text-ellipsis capitalize">
          {data.state}
        </p>
      </div>
    );
  };

   const Actions = ({ data }: { data: UserI }) => {
     return (
       <div className="flex gap-3 justify-center">

         <Like1
           color="#48A56E"
           variant = {data.approved === null ? 'Linear' : data.approved === true ? "Bold" : "Linear"}
           className="hover:text-primary-900 cursor-pointer"
           size={28}
           onClick={() => {
             setTrue(data.id);
           }}
         />

        <Dislike
           color="#ff0000"
           variant = {data.approved === null ? 'Linear' : data.approved === true ? "Linear" : "Bold"}
           className="hover:text-primary-900 cursor-pointer"
           size={28}
           onClick={() => {
            if(data.approved == null) setFalse(data.id)
           }}
         />
       </div>
     );
   };
   
if(!filteredList )return <h1>Loading...</h1>
  return (
    <Table
      data={filteredList}
      listInfos={[
        {
          subtitle: "Nome/CPF",
          element: (listRowInfo: UserI) => <NameCPF data={listRowInfo} />,
        },
        {
          subtitle: "Cidade/UF",
          element: (listRowInfo: UserI) => <CityUF data={listRowInfo} />,
        },
        {
          subtitle: "Celular",
          dataKey: "phone",
          mask: e => phoneMask(e)
        },
        {
          subtitle: "Email",
          dataKey: "email",
          style: { overflow: "hidden"},
        },
        {
          subtitle: "Data de Nascimento",
          dataKey: "birth_date",
        },
        {
          subtitle: "Profissão",
          dataKey: "profession",
        },
        {
          subtitle: "Horário de envio",
          dataKey: "registration_time",
        },
        {
          subtitle: "Ações",
          element: (listRowInfo: UserI) => <Actions data={listRowInfo} />,
          style: { flex: 0.5, textAlign: "center", margin: "auto" },
        },
      ]}
    />
  );
};

export default UserList;

