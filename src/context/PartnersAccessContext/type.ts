export interface UserI {
  agriculture_area: number;
  approved: null;
  birth_date: string;
  company: string;
  city: string;
  consultancy_name: string;
  cpf: string;
  email: string;
  farm_name: string;
  fone: string;
  has_consultacy: boolean;
  has_safrinha: boolean;
  has_silage: boolean;
  id: string;
  livestock_area: number;
  name: string;
  number_of_cows: number;
  number_of_matrices: number;
  production_system: string;
  profession: string;
  property_area: number;
  state: string;
  system_of_matrices: string;
  registration_time: string;
}

export interface AddUserI
  extends Omit<UserI, "office" | "last_access" | "last_activity"> {
  company: string;
  password: string;
}

export interface PartnersAccessContextI {
  user: UserI | null;
  setUser: (user: UserI | null) => void;
  userList: UserI[];
  setUserList: (users: UserI[]) => void;
  getUserList: () => void;
  addUser: (user: AddUserI) => Promise<boolean>;
  editUser: (user: AddUserI) => Promise<boolean>;
  userType: "approved" | "reproved" | "not_awnsered" | "all";
  setUserType: (type: "approved" | "reproved" | "not_awnsered" | "all") => void;
  getApproved: () => void;
  getRepproved: () => void;
  getNotAwnsered: () => void;
  getAll: () => void;
  approvedList: UserI[];
  repprovedList: UserI[];
  notAwnseredList: UserI[];
  allList: UserI[];
}
