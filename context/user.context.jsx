import { createContext, useState, useEffect } from "react";
import {
  getCurrentLoggedInUserDocument,
  getCurrentUserSession,
  signOutAuthUser,
} from "../lib/appwrite";

const INITIAL_STATE = {
  currentUser: null,
  session: null,
  isLoading: false,
  setIsLoading: () => null,
  setCurrentUser: () => null,
  setSession: () => null,
};

export const UserContext = createContext(INITIAL_STATE);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function checkIfUserLoggedIn() {
      try {
        setIsLoading(true);
        const currentUser = await getCurrentLoggedInUserDocument();
        const session = await getCurrentUserSession();

        setCurrentUser(currentUser);
        setSession(session);
      } catch (error) {
        console.log("User Context", error);
      } finally {
        setIsLoading(false);
      }
    }
    checkIfUserLoggedIn();
  }, []);

  const values = {
    currentUser,
    setCurrentUser,
    session,
    setSession,
    isLoading,
    setIsLoading,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
