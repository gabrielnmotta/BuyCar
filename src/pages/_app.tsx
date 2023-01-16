import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Layout from '../components/Layout';
import "react-toastify/dist/ReactToastify.css";
import { CustomerProvider } from '../services/ContextAuth';
import { AuthProvider } from '../context/Auth';
import { UserAccessProvider } from '../context/UserAccessContext';
import { PartnersAccessProvider } from '../context/PartnersAccessContext';
import { OthersAccessProvider } from '../context/OthersAccessContext';

function MyApp({Component, pageProps }: AppProps) {
  const router = useRouter();

  if(router.pathname == "/")
  return(
    <CustomerProvider>
      <AuthProvider>
        <UserAccessProvider>
          <Component {...pageProps} />
        </UserAccessProvider>
      </AuthProvider>
    </CustomerProvider>
  );

    return (
      <CustomerProvider>
        <AuthProvider>
        <OthersAccessProvider>
        <PartnersAccessProvider>
          <UserAccessProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserAccessProvider>
          </PartnersAccessProvider>
          </OthersAccessProvider>
        </AuthProvider>
      </CustomerProvider>
    )
}

export default MyApp;