import { User } from "iconsax-react";
import React, { createContext, useState } from "react";
import { removeMask } from "../../utils/masks";
import { api, Get, Post, Put, returnHeaders } from "../../api/api";
import { AddUserI, UserAccessContextI, UserI } from "./type";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const UserAccessContext = createContext<UserAccessContextI>({
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

export const UserAccessProvider = ({
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
    const q = collection(db, "visitors");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const visitors: UserI[] = [];
      querySnapshot.forEach((doc) => {
        visitors.push({ ...doc.data(), id: doc.id } as UserI);
      });
      setAllList(visitors);
    });
  };

  const getApproved = () => {
    const q = query(
      collection(db, "visitors"),
      where("approved", "==", true)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const visitors: UserI[] = [];
      querySnapshot.forEach((doc) => {
        visitors.push({ ...doc.data(), id: doc.id } as UserI);
      });
      setApprovedList(visitors);
    });
  };

  const getRepproved = () => {
    const q = query(
      collection(db, "visitors"),
      where("approved", "==", false)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const visitors: UserI[] = [];
      querySnapshot.forEach((doc) => {
        visitors.push({ ...doc.data(), id: doc.id } as UserI);
      });
      setRepprovedList(visitors);
    });
  };

  const getNotAwnsered = () => {
    const q = query(
      collection(db, "visitors"),
      where("approved", "==", null)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const visitors: UserI[] = [];
      querySnapshot.forEach((doc) => {
        visitors.push({ ...doc.data(), id: doc.id } as UserI);
      });
      setNotAwnseredList(visitors);
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
    <UserAccessContext.Provider
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
    </UserAccessContext.Provider>
  );
};

export default function useUserAccessContext(): UserAccessContextI {
  const context = React.useContext(UserAccessContext);

  if (!context) {
    throw new Error("useAccess must be used within a AccessProvider");
  }

  return context;
}
