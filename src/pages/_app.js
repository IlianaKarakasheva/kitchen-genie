import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layouts/havbar";
import Footer from "./layouts/footer";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import ProtectedRoute from "./layouts/ProtectedRoute";

const noAuthRequired = ["/", "/signin", "/signup", "/about", "/recipes/[id]"];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      <Navbar />
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
      <Footer />
    </AuthContextProvider>
  );
}
