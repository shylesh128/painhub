import { Layout } from "@/components/layout/Layout.component";
import { UserProvider } from "@/services/userContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
