import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useContext, useEffect } from "react";

import { signOutAuthUser } from "../../lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

import { UserContext } from "../../context/user.context";
import { router } from "expo-router";
import { VideoContext } from "../../context/videos.context";
import { VideoCard } from "../components/video-card.component";
import { icons, images } from "../../constants";
import { EmptyState } from "../components/empty-state.component";
import { InfoBox } from "../components/info-box.component";

const Profile = () => {
  const { setCurrentUser, setSession, currentUser } = useContext(UserContext);

  const {
    getCurrentUserVideos,
    currentUserVideos,
    isCurrentUserVideosLoading,
  } = useContext(VideoContext);

  useEffect(() => {
    async function getUserVideos() {
      await getCurrentUserVideos(currentUser);
    }
    getUserVideos();
  }, [currentUser]);

  const signOutHandler = async () => {
    try {
      setCurrentUser(null);
      setSession(null);
      await signOutAuthUser();
      router.replace("/sign-in.screen");
    } catch (error) {
      alert("Oops!!! Something went wrong. Please try again in a little bit.");
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <>
        <FlatList
          data={currentUserVideos ?? []}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => {
            return <VideoCard video={item} />;
          }}
          ListHeaderComponent={() => (
            <View>
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-2xl text-gray-100 m-4">
                    Profile
                  </Text>
                </View>
                <View className="m-4">
                  <TouchableOpacity
                    className="w-full items-end mb-10"
                    onPress={signOutHandler}
                  >
                    <Image
                      source={icons.logout}
                      resizeMode="contain"
                      className="w-6 h-6"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="w-full justify-center items-center mb-12 px-4">
                <View className="w-16 h-16 border border-secondary rounded-full justify-center items-center">
                  <Image
                    source={{ uri: currentUser?.avatar }}
                    className="w-[90%] h-[90%] rounded-full"
                  />
                </View>
                <InfoBox
                  title={currentUser?.username}
                  containerStyles="mt-5"
                  titleStyles="text-lg"
                />
                <View className="mt-5 flex-row">
                  <InfoBox
                    title={currentUserVideos?.length || 0}
                    subTitle="Posts"
                    containerStyles="mr-10"
                    titleStyles="text-xl"
                  />
                  <InfoBox
                    title="5.2K"
                    subTitle="Followers"
                    titleStyles="text-xl"
                  />
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found."
              subtitle="No Videos found for search query."
            />
          )}
        />
      </>
    </SafeAreaView>
  );
};

export default Profile;
