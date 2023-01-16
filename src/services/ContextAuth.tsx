import axios from "axios";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "./firebaseConfig";

type CustomerContextData = {
    Auth: (email: string, password: string) => Promise<void>;
    user: {}
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setUser: (user: boolean) => void;
    setPassword: (password: string) => void;
    loading: boolean
}

export const CustomerContext = createContext<CustomerContextData>({} as CustomerContextData);

type IProps = { children: React.ReactNode  };

export const CustomerProvider: React.FC<IProps> = ({ children }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState<boolean>(false);

    const Auth = async (email: string, password: string) => { 
        try{
            const usr = await signInWithEmailAndPassword(auth, email, password);
            const token = (await usr.user.getIdTokenResult()).token;
            axios.get("https://login-client-om32e3yzoa-uc.a.run.app/authentication", {
                    headers: {
                        Authorization: token,
                    }
                }).then((response) => {
                    toast.success("Acesso autorizado");
                    setLoading(false);

                }).catch((error) => {
                    setLoading(false);
                }
            );
        }
        catch(error){
            console.log(error);
            toast.error("Usuário ou senha inválidos");
        }
    };

    
        

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser:any) => {
          setUser(currentUser);
        });
        return () => {
          unsubscribe();
        };
      }, []);
    
    return (

        <CustomerContext.Provider value={{ user, email, loading, password, setEmail, setUser, setPassword, Auth}}>
            {children}
        </CustomerContext.Provider>
    )
}
export const useCustomerProvider = () => useContext(CustomerContext);