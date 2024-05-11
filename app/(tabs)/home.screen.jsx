import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useContext, useState } from "react";

import { UserContext } from "../../context/user.context";
import { VideoContext } from "../../context/videos.context";

import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";

import { SearchInput } from "../components/search-input.component";
import { Trending } from "../components/trending.component";
import { EmptyState } from "../components/empty-state.component";
import { VideoCard } from "../components/video-card.component";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const { videos, latestVideos, isLoading, getVideos, getLatestVideos } =
    useContext(VideoContext);

  const [refreshing, setRefreshing] = useState(isLoading);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      // get videos from the database
      await getVideos();
      await getLatestVideos();
      setRefreshing(false);
    } catch (error) {}
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {currentUser && (
        <>
          <FlatList
            data={videos ?? []}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => {
              return <VideoCard video={item} />;
            }}
            ListHeaderComponent={() => (
              <View className="my-6 px-4 space-y-6">
                <View className="justify-between items-start flex-row mb-6">
                  <View>
                    <Text className="font-pmedium text-sm text-gray-100">
                      Welcome Back
                    </Text>
                    <Text className="font-pmedium text-2xl text-gray-100">
                      {currentUser.username}
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
                <SearchInput placeholder="Search for a video topic" />
                {/* <Text>Hello</Text> */}
                {/* Latest Video Section */}
                <View className="w-full flex-1 pt-5 pb-8">
                  <Text className="text-gray-100 text-lg font-pregulamb-3r ">
                    Latest Videos
                  </Text>
                  <Trending posts={latestVideos ?? []} />
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <EmptyState
                title="No Videos Found."
                subtitle="Be the first one to upload a video."
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["white"]}
                title="Loading Videos..."
                titleColor="white"
              />
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
