import { createContext, useState, useEffect } from "react";
import { getVideosFromDB, getLatestVideosFromDB } from "../lib/appwrite";

const INITIAL_STATE = {
  videos: null,
  latestVideos: null,
  isLoading: false,
  setIsLoading: () => null,
  setVideos: () => null,
  setLatestVideos: () => null,
};

export const VideoContext = createContext(INITIAL_STATE);

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState(null);
  const [latestVideos, setLatestVideos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getVideos = async () => {
    try {
      setIsLoading(true);
      const videos = await getVideosFromDB();
      setVideos(videos);
    } catch (error) {
      console.log("Video Context", error);
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
      console.log("Video Context", error);
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
  };

  return (
    <VideoContext.Provider value={values}>{children}</VideoContext.Provider>
  );
};
