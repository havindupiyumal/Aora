import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { icons } from "../../constants";

const FormField = ({
  fieldName,
  value,
  placeholder,
  handleChange,
  type,
  otherStyles,
  keyboardType,
  handleOnChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-psemibold">
        {fieldName}
      </Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChange}
          secureTextEntry={type === "password" && !showPassword}
        />

        {fieldName === "Password" && (
          <TouchableOpacity onPress={toggleShowPassword}>
            <Image
              className="w-6 h-6"
              resizeMethod="contain"
              source={showPassword ? icons.eyeHide : icons.eye}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
