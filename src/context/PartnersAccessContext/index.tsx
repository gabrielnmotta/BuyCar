import { User } from "iconsax-react";
import React, { createContext, useState } from "react";
import { removeMask } from "../../utils/masks";
import { api, Get, Post, Put, returnHeaders } from "../../api/api";
import { AddUserI, PartnersAccessContextI, UserI } from "./type";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const PartnersAccessContext = createContext<PartnersAccessContextI>({
  user: null,
  setUser: () => null,
  userList: [],
  setUserList: () => null,
  getUserList: () => null,
  addUser: async () => false,
  editUser: async () => false,
  userType: "not_awnsered",
  setUserType: () => null,
  getApproved: () => null,
  getRepproved: () => null,
  getNotAwnsered: () => null,
  getAll: () => null,
  approvedList: [],
  repprovedList: [],
  notAwnseredList: [],
  allList: [],
});

export const PartnersAccessProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userList, setUserList] = useState<UserI[]>([]);
  const [user, setUser] = useState<UserI | null>(null);
  const [userType, setUserType] = useState<
    "approved" | "reproved" | "not_awnsered" | "all"
  >("not_awnsered");
  const [approvedList, setApprovedList] = useState<UserI[]>([]);
  const [repprovedList, setRepprovedList] = useState<UserI[]>([]);
  const [notAwnseredList, setNotAwnseredList] = useState<UserI[]>([]);
  const [allList, setAllList] = useState<UserI[]>([]);

  const getAll = () => {
    const q = collection(db, "partners");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const partners: UserI[] = [];
      querySnapshot.forEach((doc) => {
        partners.push({ ...doc.data(), id: doc.id } as UserI);
      });
      setAllList(partners);
    });
  };

  const getApproved = () => {
    const q = query(collection(db, "partners"), where("approved", "==", true));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const partners: UserI[] = [];
      querySnapshot.forEach((doc) => {
        partners.push({ ...doc.data(), id: doc.id } as UserI);
      });
      setApprovedList(partners);
    });
  };

  const getRepproved = () => {
    const q = query(collection(db, "partners"), where("approved", "==", false));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const partners: UserI[] = [];
      querySnapshot.forEach((doc) => {
        partners.push({ ...doc.data(), id: doc.id } as UserI);
      });
      setRepprovedList(partners);
    });
  };

  const getNotAwnsered = () => {
    const q = query(collection(db, "partners"), where("approved", "==", null));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const partners: UserI[] = [];
      querySnapshot.forEach((doc) => {
        partners.push({ ...doc.data(), id: doc.id } as UserI);
      });
      setNotAwnseredList(partners);
    });
  };

  const getUserList = () => {
    Get(`/users`, `office=${userType.toUpperCase()}`).then((res) => {
      if (res.status) setUserList(res.data);
    });
  };

  const addUser = async (user: AddUserI) => {
    return Post("/users", {
      ...user,
      cpf: removeMask(user.cpf),
      phone: removeMask(user.fone),
    }).then((res) => {
      if (res.status) {
        getUserList();
        return true;
      } else return false;
    });
  };
  const editUser = async (user: AddUserI) => {
    return Put(`/users/${user.id}`, {
      ...user,
      cpf: removeMask(user.cpf),
      phone: removeMask(user.fone),
    }).then((res) => {
      if (res.status) {
        getUserList();
        return true;
      } else return false;
    });
  };

  return (
    <PartnersAccessContext.Provider
      value={{
        userList,
        setUserList,
        getUserList,
        addUser,
        user,
        setUser,
        editUser,
        userType,
        setUserType,
        getApproved,
        getRepproved,
        getNotAwnsered,
        getAll,
        approvedList,
        repprovedList,
        notAwnseredList,
        allList,
      }}
    >
      {children}
    </PartnersAccessContext.Provider>
  );
};

export default function usePartnersAccessContext(): PartnersAccessContextI {
  const context = React.useContext(PartnersAccessContext);

  if (!context) {
    throw new Error("useAccess must be used within a AccessProvider");
  }

  return context;
}
