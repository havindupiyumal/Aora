import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";

import { signOutAuthUser } from "../../lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

import { UserContext } from "../../context/user.context";
import { router } from "expo-router";

const Profile = () => {
  const { setCurrentUser, setSession } = useContext(UserContext);

  const signOutHandler = async () => {
    try {
      setCurrentUser(null);
      setSession(null);
      await signOutAuthUser();
      router.navigate("/");
    } catch (error) {
      alert("Sign out Error : ", error);
    }
  };

  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <TouchableOpacity onPress={signOutHandler}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
