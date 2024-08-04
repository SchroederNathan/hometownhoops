import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase";

export async function uploadImage(file: File) {
  try {
    // Create a reference to 'images/fileName'
    const storageRef = ref(storage, `images/${file.name}`);

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
}
