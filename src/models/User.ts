import { db } from "src/base";
import FBStorage from "src/utils/storage";

interface UserProps {
  uid: string;
  address: string;
  ci: string;
  city: string;
  email: string;
  experience: string;
  licenseCode: string;
  lname: string;
  name: string;
  phone: string;
  photoUrl: string;
  province: string;
  role: string;
  roles: string[];
  score: number;
  sectors: string[];
  sells: number;
  status: string;
}

const converter = {
  fromFirestore: (snapshot: any) => {
    const snapData = snapshot.data();

    const user = new User({
      uid: snapData.uid,
      address: snapData?.address,
      ci: snapData?.ci,
      city: snapData?.city,
      email: snapData?.email,
      experience: snapData?.experience,
      licenseCode: snapData?.licenseCode,
      lname: snapData?.lname,
      name: snapData?.name,
      phone: snapData?.phone,
      photoUrl: snapData?.photoUrl,
      province: snapData?.province,
      role: snapData?.role,
      roles: snapData?.roles,
      score: snapData?.score,
      sectors: snapData?.sectors,
      sells: snapData?.sells,
      status: snapData?.status,
    });

    return user;
  },
  toFirestore: (modelObject: User) => modelObject,
};

export default class User implements UserProps {
  uid: string;
  address: string;
  ci: string;
  city: string;
  email: string;
  experience: string;
  licenseCode: string;
  lname: string;
  name: string;
  phone: string;
  photoUrl: string;
  province: string;
  role: string;
  roles: string[];
  score: number;
  sectors: string[];
  sells: number;
  status: string;

  constructor(user: User) {
    this.uid = user.uid;
    this.address = user.address;
    this.ci = user.ci;
    this.city = user.city;
    this.email = user.email;
    this.experience = user.experience;
    this.licenseCode = user.licenseCode;
    this.lname = user.lname;
    this.name = user.name;
    this.phone = user.phone;
    this.photoUrl = user.photoUrl;
    this.province = user.province;
    this.role = user.role;
    this.roles = user.roles;
    this.score = user.score;
    this.sectors = user.sectors;
    this.sells = user.sells;
    this.status = user.status;
  }

  static collection() {
    return db.collection("users").withConverter<User>(converter);
  }

  static ref(id?: string) {
    if (id) return User.collection().doc(id);
    return User.collection().doc();
  }

  static save = async (user: Partial<User>, image: File) => {
    try {
      const ref = User.collection().doc(user.uid);
      await ref.set(user, { merge: true });

      if (image) {
        const path = `users/${user.uid}/${image.name}`;
        const url = await FBStorage.upload(image, path);

        if (url) await ref.set({ photoUrl: url }, { merge: true });
      }
      return { user, error: null };
    } catch (error) {
      console.error(error);
      return { user: null, error };
    }
  };

  static exists = async (ci: string) => {
    try {
      const docRef = User.collection().where("ci", "==", ci);

      const snap = await docRef.get();

      const exists = snap.docs.length > 0;

      return { exists, error: null };
    } catch (error) {
      console.error(error);
      return { user: null, error };
    }
  };
}
