import { View, Text, Image } from "react-native";
import React from "react";

import { router } from "expo-router";

import { images } from "../../constants";

import CustomButton from "../components/custom-button.component";

export const EmptyState = ({ title, subtitle }) => {
  const handleSubmit = () => router.push("/create.screen");

  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-xl text-center text-gray-100 mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

      <CustomButton
        title="Create Video"
        handlePress={handleSubmit}
        containerStyles="w-full  my-5"
      />
    </View>
  );
};
