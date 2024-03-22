import { auth, db, provider, storage } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import * as all from "./actions";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export function signIn() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(all.setUser(payload.user));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}

export function userAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(all.setUser(user));
      } else {
        dispatch(all.setUser(null));
      }
    });
  };
}

export function uploadData(data) {
  return async (dispatch) => {
    dispatch(all.setLoading(true));
    if (data.image) {
      const storageRef = ref(storage, `images/${data.image.name}${Date.now()}`);
      const uploadImage = uploadBytesResumable(storageRef, data.image);
      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          alert(error.message);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
            const collRef = collection(db, "posts");
            addDoc(collRef, {
              user: data.user,
              comments: 0,
              text: data.text,
              image: downloadURL,
              video: data.video,
            }).then(() => dispatch(all.setLoading(false)));
          });
        }
      );
    } else {
      const collRef = collection(db, "posts");
      addDoc(collRef, {
        user: data.user,
        comments: 0,
        text: data.text,
        image: data.image,
        video: data.video,
      }).then(() => dispatch(all.setLoading(false)));
    }
  };
}

export const showPosts = () => {
  return (dispatch) => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("user.date", "desc"));
    let data;
    onSnapshot(q, (snapshot) => {
      data = snapshot.docs.map((el) => el.data());
      dispatch(all.getPosts(data));
    });
  };
};
