import { createContext, useState, useEffect } from "react";
import {
  getVideosFromDB,
  getLatestVideosFromDB,
  searchVideosFromDB,
} from "../lib/appwrite";

const INITIAL_STATE = {
  videos: null,
  latestVideos: null,
  isLoading: false,
  setIsLoading: () => null,
  setVideos: () => null,
  setLatestVideos: () => null,
  isFilteredVideosLoading: false,
  setIsFilteredVideosLoading: () => null,
  searchQuery: "",
  setSearchQuery: () => null,
  filteredVideos: null,
  setFilteredVideos: () => null,
};

export const VideoContext = createContext(INITIAL_STATE);

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState(null);
  const [latestVideos, setLatestVideos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isFilteredVideosLoading, setIsFilteredVideosLoading] = useState(false);

  const getFilteredVideos = async (query) => {
    try {
      setIsFilteredVideosLoading(true);
      const videos = await searchVideosFromDB(query);
      setFilteredVideos(videos);
    } catch (error) {
      console.log("Video Context: getFilteredVideos", error);
    } finally {
      setIsFilteredVideosLoading(false);
    }
  };

  useEffect(() => {
    async function gatherVideosFromDB() {
      await getFilteredVideos(searchQuery);
    }
    gatherVideosFromDB();
  }, [searchQuery]);

  const getVideos = async () => {
    try {
      setIsLoading(true);
      const videos = await getVideosFromDB();
      setVideos(videos);
    } catch (error) {
      console.log("Video Context: getVideos", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLatestVideos = async () => {
    try {
      setIsLoading(true);
      const videos = await getLatestVideosFromDB();
      setLatestVideos(videos);
    } catch (error) {
      console.log("Video Context : getLatestVideos", error);
    } finally {
      setIsLoading(false);
    }
  };

  // load the videos on component load
  useEffect(() => {
    async function gatherVideosFromDB() {
      await getVideos();
      await getLatestVideos();
    }
    gatherVideosFromDB();
  }, []);

  const values = {
    videos,
    latestVideos,
    getLatestVideos,
    getVideos,
    isLoading,
    setIsLoading,
    searchQuery,
    setSearchQuery,
    filteredVideos,
    setFilteredVideos,
    isFilteredVideosLoading,
  };

  return (
    <VideoContext.Provider value={values}>{children}</VideoContext.Provider>
  );
};
