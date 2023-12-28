import { auth } from "src/base";
import User from "src/models/User";

export default class AppAuth {
  static async register(user: Omit<User, "uid">, password: string) {
    try {
      console.log("user", user);
      console.log("password", password);

      const response = await auth.createUserWithEmailAndPassword(
        user.email,
        password
      );

      if (response.user?.uid) {
        await User.create({ uid: response.user.uid, ...user });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
