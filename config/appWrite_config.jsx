import  { Client , Account, ID, Avatars, Databases, Query ,Storage} from 'react-native-appwrite'
import { 
  APPWRITE_PROJECT_ID, 
  APPWRITE_DATABASE_ID, 
  APPWRITE_USER_COLLECTION_ID, 
  APPWRITE_VIDEO_COLLECTION_ID, 
  APPWRITE_STORAGE_ID 
} from "@env";
import * as FileSystem from "expo-file-system"

export const appwriteconfig={

    endpoint:'https://cloud.appwrite.io/v1',
    platform:'com.asd.em',
    projectId:APPWRITE_PROJECT_ID,
    databaseId:APPWRITE_DATABASE_ID,
    userCollectionId:APPWRITE_USER_COLLECTION_ID,
    videoCollectionId:APPWRITE_VIDEO_COLLECTION_ID,
    storageId:APPWRITE_STORAGE_ID,
}
const client =new Client();
client
.setEndpoint(appwriteconfig.endpoint)
.setProject(appwriteconfig.projectId)
.setPlatform(appwriteconfig.platform)

const account = new Account(client);
const storage = new Storage(client);

// Register User
export async function createUser (email,password,username){
  
  try{
const regist = await account.create(ID.unique(), email,password,username)
  if (!regist) throw Error;  
  const avatUrl = new Avatars (client).getInitials(username)
  
  await loginFunc(email,password)

  const UserinDB = await new Databases (client).createDocument(
    appwriteconfig.databaseId,
    appwriteconfig.userCollectionId,
    ID.unique(),{
        userId:regist.$id,
        username: username,
        email: regist.email,
        avatar:avatUrl
    }
  )
  console.log(" User saved in DB:", UserinDB);

  return UserinDB;

}
  catch(error){
    console.log(error)
    throw new Error(error)
  }
    
}
export async function loginFunc (email,password){
  try{
     const session = await account.createEmailPasswordSession(email,password)
     console.log("Login successful!", session);
     return session;
    }
      catch(error){
        console.log(error)
        throw new Error(error)
      } 
}
// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAccount() {
  try{
     const currentAccount = await account.get()
     return currentAccount;
  }
  catch(error){
       throw new Error(error);
  }

}
export async function getUser() {
  try{
     const currentAccount = await getAccount()
     if(!currentAccount) throw Error;
     const currentUser =await new Databases (client).listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.userCollectionId,
      [Query.equal("userId", currentAccount.$id)]
     )
     console.log("user Data",currentUser.documents)
     return currentUser.documents[0]
  }
  catch(error){
    console.log("Error fetching user data")
    throw new Error(error);
  }
}
export async function getUserPosts(Id) {
  try{
     const posts =await new Databases (client).listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.videoCollectionId,
      [Query.equal("creator",Id)]
     )
     console.log("user Data",posts.documents)
     return posts.documents 
  }
  catch(error){
    console.log("Error fetching UserPosts data")
    throw new Error(error);
  }
}
export async function getAllPosts() {
  try{
     const posts = await new Databases (client).listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.videoCollectionId
     )
     console.log("Posts data",posts.documents)
     return posts.documents
  }
  catch(error){
    console.log("Error fetching AllPosts data")
    throw new Error(error);
  }
}
export async function getTrendPosts() {
  try{
     const posts = await new Databases (client).listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.videoCollectionId,
      [Query.orderDesc('$createdAt',Query.limit(5))]
     )
     console.log("Posts trend data",posts.documents)
     return posts.documents
  }
  catch(error){
    console.log("Error fetching Posts data")
    throw new Error(error);
  }
}
export async function searchPosts(query) {
  try{
     const posts = await new Databases (client).listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.videoCollectionId,
      [Query.search('title',query)]
     )
     console.log("Posts data",posts.documents)
     return posts.documents
  }
  catch(error){
    console.log("Error fetching Posts data")
    throw new Error(error);
  }
}
/*export async function uploadFile(fileUri, type) {
  if (!fileUri) {
    console.error("⚠️ No file selected.");
    throw new Error("No file selected");
  }

  try {
    console.log("📤 Uploading file:", fileUri);

    // Convert File URI to Blob
    const response = await fetch(fileUri);
    const fileBlob = await response.blob();

    // Create FormData for upload
    const formData = new FormData();
    formData.append("file", fileBlob, "upload.jpg");
        console.log(fileBlob)
    // Upload file using Fetch API (Appwrite requires FormData)
    const uploadResponse = await fetch(
      `https://cloud.appwrite.io/v1/storage/buckets/${appwriteconfig.storageId}/files`,
      {
        method: "POST",
        headers: {
          "X-Appwrite-Project": appwriteconfig.projectId,
        },
        body: formData,
      }
    );

    const uploadedFile = await uploadResponse.json();
    console.log("what is",uploadResponse)
    console.log("✅ File uploaded successfully:", uploadedFile);

    if (!uploadedFile || !uploadedFile.$id) {
      console.log(uploadedFile.$id)
      throw new Error("File upload failed.");
    }

    return uploadedFile.$id;
  } catch (error) {
    console.error("❌ File upload error:", error);
    throw error;
  }
}
export async function createVideoPost(title,thumbnailUri, youtubeUrl, prompt, userId) {
  try {
    console.log("📤 Uploading thumbnail...");
    const thumbnailUrl = await uploadFile(thumbnailUri, "image");

    console.log("📡 Creating video post...");
    const newPost = await new Databases.createDocument(
      appwriteconfig.databaseId,
      appwriteconfig.videoCollectionId,
      ID.unique(),
      {
        title,
        thumbnail: thumbnailUrl,
        video: youtubeUrl,
        prompt,
        creator: userId,
      }
    );

    console.log("✅ Video post created successfully!", newPost);
    return newPost;
  } catch (error) {
    console.error("❌ Error creating video post:", error);
    throw new Error(error);
  }
}
*/

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteconfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    console.log("what is ",fileUrl)
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  try {
    const fileUrl = storage.getFilePreview(
        appwriteconfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
     if (!fileUrl) throw Error;
      
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createVideoPost(title,thumbnailUri, youtubeUrl, prompt, userId) {
  try {
    const thumbnailUrl = await uploadFile(thumbnailUri, "image");

    const newPost = await new Databases(client).createDocument(
      appwriteconfig.databaseId,
      appwriteconfig.videoCollectionId,
      ID.unique(),
      {
        title: title,
        thumbnail: thumbnailUrl,
        video: youtubeUrl,
        prompt: prompt,
        creator: userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}