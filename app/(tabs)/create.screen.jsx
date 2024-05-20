import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/form-field.component";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../components/custom-button.component";

import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { VideoContext } from "../../context/videos.context";
import { UserContext } from "../../context/user.context";

const Create = () => {
  const router = useRouter();

  const [uploading, setUploading] = useState(false);

  const { addNewVideo } = useContext(VideoContext);
  const { currentUser } = useContext(UserContext);

  const initialFormState = {
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  };

  const [form, setForm] = useState(initialFormState);

  const { title, video, thumbnail, promt } = form;

  const handleChange = (name, value) => setForm({ ...form, [name]: value });

  const handleSubmit = async () => {
    try {
      if (!title || !video || !thumbnail || !promt) {
        alert("All fields are required!!!");
        return;
      }
      setUploading(true);

      const response = await addNewVideo(form, currentUser);

      alert("Video uploaded successfully");

      router.push("/home.screen");
    } catch (error) {
      alert(error);
    } finally {
      //setForm(initialFormState);
      setUploading(false);
    }
  };

  const openPicker = async (openType) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          openType === "image"
            ? ImagePicker.MediaTypeOptions.Images
            : ImagePicker.MediaTypeOptions.Videos,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        if (openType === "video") {
          handleChange("video", result.assets[0]);
        }

        if (openType === "image") {
          handleChange("thumbnail", result.assets[0]);
        }
      } else {
        setTimeout(() => {
          alert("No Document Picked.");
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          fieldName="Video Title"
          placeholder="Give your video a catchy title..."
          value={title}
          handleChange={(e) => handleChange("title", e)}
          type="email"
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity className="" onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: video.uri }}
                className="h-64 w-full rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity className="" onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          fieldName="AI Prompt"
          placeholder="The prompt you used to create this video."
          value={promt}
          handleChange={(e) => handleChange("promt", e)}
          type="email"
          otherStyles="mt-3"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={handleSubmit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
