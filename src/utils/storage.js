export default class FBStorage {
  static async upload(file, path) {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      throw error;
    }
  }

  static async getFiles(path) {
    try {
      const storageRef = ref(storage, path);
      const { items } = await listAll(storageRef);
      return items;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getUrl(reference) {
    try {
      return await getDownloadURL(reference);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
