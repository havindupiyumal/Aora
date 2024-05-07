import { View, Text } from "react-native";
import React, { useContext } from "react";

import { UserContext } from "../../context/user.context";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { currentUser } = useContext(UserContext);

  console.log("Home", currentUser);

  return (
    <SafeAreaView className="">
      {currentUser && (
        <>
          <Text>{currentUser.username}</Text>
          <Text>{currentUser.email}</Text>
          <Text>{currentUser.avatar}</Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
