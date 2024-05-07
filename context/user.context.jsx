import { router } from "expo-router";
import { createContext, useState, useEffect } from "react";
import {
  getCurrentLoggedInUserDocument,
  getCurrentUserSession,
} from "../lib/appwrite";

const INITIAL_STATE = {
  currentUser: null,
  session: null,
  setCurrentUser: () => null,
  setSession: () => null,
};

export const UserContext = createContext(INITIAL_STATE);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function checkIfUserLoggedIn() {
      try {
        const currentUser = await getCurrentLoggedInUserDocument();
        const session = await getCurrentUserSession();

        setCurrentUser(currentUser);
        setSession(session);
      } catch (error) {
        console.log("User Context", error);
      }
    }
    checkIfUserLoggedIn();
  }, []);

  const values = {
    currentUser,
    setCurrentUser,
    session,
    setSession,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
