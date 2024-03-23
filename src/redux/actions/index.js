import { auth, db, provider, storage } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import * as all from "./actions";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

export function signIn() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(all.setUser(payload.user));
      })
      .catch((error) => {
        Swal.fire(error.message, "", "error");
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
      console.log("User Auth Change", user);
      document.querySelector("#loader").style.display = "none";
    });
  };
}

export function uploadData(data) {
  return async (dispatch) => {
    dispatch(all.setLoading(true));
    if (data.image) {
      const storageRef = ref(
        storage,
        `images/${data.user.uid}${data.user.date}`
      );
      const uploadImage = uploadBytesResumable(storageRef, data.image);
      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          Swal.fire(error.message, "", "error");
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
            setDoc(doc(db, "posts", data.user.uid + data.user.date), {
              user: data.user,
              text: data.text,
              image: downloadURL,
              video: data.video,
              comments: 0,
              shares: 0,
              likes: 0,
            }).then(() => dispatch(all.setLoading(false)));
          });
        }
      );
    } else {
      setDoc(doc(db, "posts", data.user.uid + data.user.date), {
        user: data.user,
        text: data.text,
        image: data.image,
        video: data.video,
        comments: 0,
        shares: 0,
        likes: 0,
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

export const deletePost = ({ user, image }) => {
  return (dispatch) => {
    dispatch(all.setLoading(true));
    deleteDoc(doc(db, "posts", user.uid + user.date)).then(() =>
      dispatch(all.setLoading(false))
    );

    if (image) {
      const imgRef = ref(storage, `images/${user.uid}${user.date}`);

      // Delete the file
      deleteObject(imgRef).then(() => {
        // File deleted successfully
        console.log("Image Deleted");
      });
    }
  };
};
