import { storage } from "src/base";

import { v4 as uuidv4 } from "uuid";

export default class FBStorage {
  static async upload(file: File, path: string) {
    try {
      const url = await new Promise((resolve, reject) => {
        const storageRef = storage.ref(path);

        const task = storageRef.put(file);

        task.then(
          async (event) => {
            const url = await event.ref.getDownloadURL();
            resolve(url);
          },
          (error) => {
            reject(error);
          }
        );
      });

      return url as string;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  static async download(url: string): Promise<void | File> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], uuidv4());
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  }
}