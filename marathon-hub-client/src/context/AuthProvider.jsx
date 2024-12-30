import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2"; // Import SweetAlert2
import auth from "../../firebase/firebase.init";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create new user and update profile
  const createNewUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      // Register new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;

      if (currentUser) {
        // Update the profile with displayName and photoURL
        await updateProfile(currentUser, {
          displayName: name,
          photoURL: photoURL,
        });

        // Set the user state after updating profile
        setUser({
          ...currentUser,
          displayName: name,
          photoURL: photoURL,
        });

        Swal.fire("Success!", "Account created successfully!", "success");
      }

      return userCredential; // Return the userCredential with the user data
    } catch (error) {
      console.error("Error during registration:", error.message);
      Swal.fire("Error!", error.message || "Account creation failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const Login = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire("Success!", "Logged in successfully!", "success");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const logOut = async () => {
    try {
      await signOut(auth);
      Swal.fire("Logged Out!", "You have successfully logged out!", "success");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setUser(res.user);
      Swal.fire("Success!", "Logged in successfully with Google!", "success");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Firebase authentication state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser?.email);

      if (currentUser?.email) {
        const user = { email: currentUser.email };

        axios
          .post("https://marathon-hub-server-chi.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("login jwt token", res.data);
            setLoading(false);
          });
      } else {
        axios
          .post(
            "https://marathon-hub-server-chi.vercel.app/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("logout", res.data);
            setLoading(false);
          });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const authInfo = {
    createNewUser,
    user,
    Login,
    logOut,
    signInWithGoogle,
    setLoading,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
