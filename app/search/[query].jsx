import { View, Text, FlatList, RefreshControl, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { VideoContext } from "../../context/videos.context";
import { VideoCard } from "../components/video-card.component";
import { images } from "../../constants";
import { EmptyState } from "../components/empty-state.component";
import { SearchInput } from "../components/search-input.component";

const Search = () => {
  const { query } = useLocalSearchParams();

  const { setSearchQuery, filteredVideos, setFilteredVideos } =
    useContext(VideoContext);

  useEffect(() => {
    setFilteredVideos(null);
    setSearchQuery(query);
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <>
        <FlatList
          data={filteredVideos ?? []}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => {
            return <VideoCard video={item} />;
          }}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Search Results
                  </Text>
                  <Text className="font-pmedium text-2xl text-gray-100">
                    {query}
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
              <SearchInput
                intialQuery={query}
                placeholder="Search for a video topic"
              />
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

export default Search;
