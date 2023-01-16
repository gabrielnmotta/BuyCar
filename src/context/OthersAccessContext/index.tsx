import { User } from "iconsax-react";
import React, { createContext, useState } from "react";
import { removeMask } from "../../utils/masks";
import { api, Get, Post, Put, returnHeaders } from "../../api/api";
import { AddUserI, OthersAccessContextI, UserI } from "./type";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const OthersAccessContext = createContext<OthersAccessContextI>({
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

export const OthersAccessProvider = ({
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
    const q = collection(db, "others");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const others: UserI[] = [];
      querySnapshot.forEach((doc) => {
        others.push({ ...doc.data(), id: doc.id } as UserI);
      });
      setAllList(others);
    });
  };

  const getApproved = () => {
    const q = query(
      collection(db, "others"),
      orderBy("registration_time"),
      where("approved", "==", true)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const others: UserI[] = [];
      querySnapshot.forEach((doc) => {
        others.push({ ...doc.data(), id: doc.id } as UserI);
      });
      setApprovedList(others);
    });
  };

  const getRepproved = () => {
    const q = query(
      collection(db, "others"),
      orderBy("registration_time"),
      where("approved", "==", false)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const others: UserI[] = [];
      querySnapshot.forEach((doc) => {
        others.push({ ...doc.data(), id: doc.id } as UserI);
      });
      setRepprovedList(others);
    });
  };

  const getNotAwnsered = () => {
    const q = query(
      collection(db, "others"),
      orderBy("registration_time"),
      where("approved", "==", null)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const others: UserI[] = [];
      querySnapshot.forEach((doc) => {
        others.push({ ...doc.data(), id: doc.id } as UserI);
      });
      setNotAwnseredList(others);
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
    <OthersAccessContext.Provider
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
    </OthersAccessContext.Provider>
  );
};

export default function useOthersAccessContext(): OthersAccessContextI {
  const context = React.useContext(OthersAccessContext);

  if (!context) {
    throw new Error("useAccess must be used within a AccessProvider");
  }

  return context;
}
