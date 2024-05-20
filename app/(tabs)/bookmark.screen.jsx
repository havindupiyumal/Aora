import { View, Text, FlatList, RefreshControl, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { VideoContext } from "../../context/videos.context";
import { VideoCard } from "../components/video-card.component";
import { images } from "../../constants";
import { EmptyState } from "../components/empty-state.component";
import { UserContext } from "../../context/user.context";

const Bookmark = () => {
  const { currentUser } = useContext(UserContext);

  console.log(currentUser);

  const savedVideos = currentUser.bookmarked_videos;

  return (
    <SafeAreaView className="bg-primary h-full">
      <>
        <FlatList
          data={savedVideos ?? []}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => {
            return <VideoCard video={item} />;
          }}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-2xl text-gray-100">
                    Saved Videos
                  </Text>
                </View>
                <View className="mt-1.5">
                  <Image
                    className="w-9 h-10"
                    resizeMethod="contain"
                    source={images.logoSmall}
                  />
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Saved Videos Found."
              subtitle="heart videos to save."
            />
          )}
        />
      </>
    </SafeAreaView>
  );
};

export default Bookmark;
