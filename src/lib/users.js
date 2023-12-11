import PropTypes from "prop-types";
import { db } from "src/base";

export const UserProps = {
  uid: PropTypes.string,
  address: PropTypes.string,
  ci: PropTypes.string,
  city: PropTypes.string,
  email: PropTypes.string,
  experience: PropTypes.string,
  licenseCode: PropTypes.string,
  lname: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
  photoUrl: PropTypes.string,
  province: PropTypes.string,
  role: PropTypes.string,
  roles: PropTypes.array,
  score: PropTypes.number,
  sectors: PropTypes.array,
  sells: PropTypes.number,
  status: PropTypes.string,
};

export default class User {
  /**
   * @param  {object} user
   * @param  {string | undefined} images
   */
  static save = async (user, image) => {
    try {
      const ref = db.firestore().collection("users").doc(user.uid);
      await ref.set(user, { merge: true });

      if (image) {
        const path = `users/${user.uid}/${image.name}`;
        const url = await FBStorage.upload(image, path);
        user.photoUrl = url;
        await ref.set({ url }, { merge: true });
      }
      return user;
    } catch (error) {
      console.error(error);
    }
  };
}
