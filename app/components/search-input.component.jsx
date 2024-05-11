import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { icons } from "../../constants";

export const SearchInput = ({
  fieldName,
  value,
  placeholder,
  handleChange,
  type,
  otherStyles,
  keyboardType,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#e7e7ef"
        onChangeText={handleChange}
        secureTextEntry={type === "password" && !showPassword}
      />

      <TouchableOpacity onPress={toggleShowPassword}>
        <Image
          className="w-5 h-5"
          resizeMethod="contain"
          source={icons.search}
        />
      </TouchableOpacity>
    </View>
  );
};
