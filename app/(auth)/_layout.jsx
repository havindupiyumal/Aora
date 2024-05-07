import { StatusBar } from "expo-status-bar";

import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in.screen" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up.screen" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
