import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { icons } from "../../constants";
import { usePathname, useRouter } from "expo-router";

export const SearchInput = ({ intialQuery, placeholder }) => {
  const pathName = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState(intialQuery || "");

  const handleOnChangeText = (e) => setQuery(e);

  const onPressHandler = () => {
    if (!query)
      return alert("Please input something to search results across database");

    pathName.startsWith("/search")
      ? router.setParams({ query })
      : router.push(`search/${query}`);
  };

  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#ededf4"
        onChangeText={handleOnChangeText}
      />

      <TouchableOpacity onPress={onPressHandler}>
        <Image
          className="w-5 h-5"
          resizeMethod="contain"
          source={icons.search}
        />
      </TouchableOpacity>
    </View>
  );
};
