import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/clientApp";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAuthState = (authState) => {
    localStorage.setItem("authState", JSON.stringify(authState));
  };

  useEffect(() => {
    const storedAuthState = JSON.parse(localStorage.getItem("authState"));
    if (storedAuthState) {
      setUser(storedAuthState.user);
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
        setAuthState({
          isAuthenticated: true,
          user: { uid: user.uid, email: user.email },
        });
      } else {
        setUser(null);
        setAuthState({
          isAuthenticated: false,
          user: null,
        });
      }
    });

    setLoading(false);
    return () => unsubscribe();
  }, []);

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        });
        setAuthState({
          isAuthenticated: true,
          user: {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          },
        });
      }
    );
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        });
        setAuthState({
          isAuthenticated: true,
          user: {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          },
        });
      }
    );
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
