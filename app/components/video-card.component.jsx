import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";

import { updateBookmarkVidoesOfAuthUser } from "../../lib/appwrite";

import { UserContext } from "../../context/user.context";

export const VideoCard = ({
  video: {
    $id,
    title,
    thumbnail,
    video,
    creators: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);

  const startPlaying = () => setPlay(true);

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const toggleBookmark = async () => {
    try {
      const response = await updateBookmarkVidoesOfAuthUser(currentUser, $id);
      setCurrentUser(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    video && (
      <View className="flex-col items-center px-4 mb-14">
        <View className="flex-row gap-3 items-start">
          <View className="justify-center items-center flex-row flex-1">
            <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
              <Image
                source={{ uri: avatar }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>
            <View className="justify-center flex-1 ml-3 gap-y-1">
              <Text
                className="text-white font-psemibold text-sm"
                numberOfLines="1"
              >
                {title}
              </Text>
              <Text
                className="text-xs text-gray-100 font-pregular"
                numberOfLines="1"
              >
                {username}
              </Text>
            </View>
          </View>
          <View className="pt-2">
            <TouchableOpacity onPress={toggleBookmark}>
              <Image
                source={
                  currentUser?.bookmarked_videos.some(
                    (video) => video.$id === $id
                  )
                    ? icons.bookmarkFilled
                    : icons.bookmark
                }
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {play ? (
          <Video
            source={{ uri: video }}
            className="w-full h-64 rounded-xl mt-3"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        ) : (
          <TouchableOpacity
            className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
            activeOpacity={0.7}
            onPress={startPlaying}
          >
            <Image
              source={{ uri: thumbnail }}
              className="w-full h-full rounded-xl mt-3"
              resizeMode="cover"
            />
            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    )
  );
};
