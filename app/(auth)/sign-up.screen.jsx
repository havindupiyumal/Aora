import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { images } from "../../constants";

import { Link } from "expo-router";

import CustomButton from "../components/custom-button.component";
import FormField from "../components/form-field.component";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeEmail = (value) => setEmail(value);

  const changeUsername = (value) => setUserName(value);

  const changePassword = (value) => setPassword(value);

  const handleSubmit = () => {
    //alert("hello");
  };

  console.log(userName, password);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            className="w-[130px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up
          </Text>

          <FormField
            fieldName="Username"
            value={userName}
            handleChange={changeUsername}
            type="text"
            otherStyles="mt-7"
            keyboardType="username"
            placeholder="Your unique unername"
          />

          <FormField
            fieldName="Email"
            value={email}
            handleChange={changeEmail}
            type="email"
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="enter your email"
          />

          <FormField
            fieldName="Password"
            value={password}
            handleChange={changePassword}
            type="password"
            otherStyles="mt-7"
            keyboardType="password"
            placeholder="enter your password"
          />

          <CustomButton
            title="Sign Up"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              className="text-lg font-psemibold text-secondary"
              href="/sign-in.screen"
            >
              Log In
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default SignUp;
