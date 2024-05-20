import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endoint: "https://cloud.appwrite.io/v1",
  platform: "com.havindu.aora",
  projectId: "663754b3002d600d602f",
  databaseId: "663756a5000a714e68fb",
  userCollectionId: "663756d7002aa96d803b",
  videoCollectionId: "663756fd002eb009da5f",
  storageId: "66375870001bd3699ba8",
};

// Init your react native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

const createUser = async (email, password, username) => {
  return account.create(ID.unique(), email, password, username);
};

const createAvatarForUser = (username) => {
  return avatars.getInitials(username);
};

export const signIn = async (email, password) => {
  return account.createEmailPasswordSession(email, password);
};

export const signOutAuthUser = async () => {
  return account.deleteSession("current");
};

export const getCurrentUserSession = async () => {
  return account.getSession("current");
};

export const getCurrentAuthUser = async () => {
  return account.get();
};

export const getCurrentLoggedInUserDocument = async () => {
  try {
    const loggedInUser = await getCurrentAuthUser();
    const existingUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("email", [loggedInUser.email])]
    );
    return existingUser.documents[0];
  } catch (error) {
    console.log("getCurrentLoggedInUserDocument", error);
  }
};

export const addNewUser = async (email, password, username) => {
  try {
    // check if a user is exists with the same email.
    const existingUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("email", [email])]
    );
    if (!existingUser.total != 0) {
      // create new user
      const user = await createUser(email, password, username);

      const avatarURL = createAvatarForUser(user.name);

      const userId = user.$id;

      const documentData = {
        username: username,
        email: email,
        avatar: avatarURL,
        accountId: userId,
      };

      return await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        userId,
        documentData
      );
    }

    return Promise.reject("User Already Exists!!!");
  } catch (error) {
    throw new Error(error);
  }
};

export const updateBookmarkVidoesOfAuthUser = async (user, videoId) => {
  try {
    // check if a user already bookmarked the video.
    const isVideoAlreadyBookmarked = user.bookmarked_videos.some(
      (video) => video.$id === videoId
    );
    let newBookmarks = user.bookmarked_videos;

    if (isVideoAlreadyBookmarked) {
      newBookmarks = newBookmarks.filter((video) => video.$id !== videoId);
    } else {
      newBookmarks.push(videoId);
    }

    return await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.$id,
      { bookmarked_videos: newBookmarks }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getVideosFromDB = async () => {
  try {
    const videos = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    return videos.documents;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getLatestVideosFromDB = async () => {
  try {
    const videos = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return videos.documents;
  } catch (error) {
    Promise.reject(error);
  }
};

export const searchVideosFromDB = async (query) => {
  try {
    const videos = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.contains("title", [query])]
    );
    return videos.documents;
  } catch (error) {
    Promise.reject(error);
  }
};

export const searchUserVideosFromDB = async (user) => {
  try {
    const videos = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creators", [user.$id]), Query.orderDesc("$createdAt")]
    );
    return videos.documents;
  } catch (error) {
    Promise.reject(error);
  }
};

export const addNewVideoToDB = async (formData, user) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(formData.thumbnail, "image"),
      uploadFile(formData.video, "video"),
    ]);

    const document = {
      title: formData.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      prompt: formData.prompt,
      creators: user.$id,
    };

    return await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      document
    );
  } catch (error) {
    Promise.reject(error);
  }
};

const getFilePreview = async (fileId, type) => {
  let fileUrl = "";

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        "100"
      );
    } else {
      throw new Error("Invalid File Type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
};

const uploadFile = async (file, fileType) => {
  try {
    console.log(file);
    if (!file) return;

    const asset = {
      name: file.fileName,
      type: file.mimeType,
      size: file.fileSize,
      uri: file.uri,
    };

    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, fileType);

    return fileUrl;
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
};
