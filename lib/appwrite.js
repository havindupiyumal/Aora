import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
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
