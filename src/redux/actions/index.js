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
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
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
              comments: [],
              shares: 0,
              likes: [],
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
        comments: [],
        shares: 0,
        likes: [],
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
      });
    }
  };
};

export const editPost = ({ text, videoLink, image, postID }) => {
  return (dispatch) => {
    dispatch(all.setLoading(true));
    if (image) {
      const imgRef = ref(storage, `images/${postID}`);
      // Delete Old Image
      deleteObject(imgRef).then(() => {
        // Image deleted successfully
      });

      // Upload New Image
      const storageRef = ref(storage, `images/${postID}`);
      const uploadImage = uploadBytesResumable(storageRef, image);
      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          Swal.fire(error.message, "", "error");
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
            updateDoc(doc(db, "posts", postID), {
              text: text,
              image: downloadURL,
            }).then(() => {
              dispatch(all.setLoading(false));
            });
          });
        }
      );
    } else {
      updateDoc(doc(db, "posts", postID), {
        video: videoLink,
        text: text,
      }).then(() => {
        dispatch(all.setLoading(false));
      });
    }
    Swal.fire("Post Update", "", "success");
  };
};

export const likePost = (user, postUser, isLiked) => {
  return async (dispatch) => {
    if (!isLiked) {
      updateDoc(doc(db, "posts", postUser.uid + postUser.date), {
        likes: arrayUnion({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        }),
      });
    } else {
      let postDoc = await getDoc(
        doc(db, "posts", postUser.uid + postUser.date)
      );
      let postData = postDoc.data();
      let newLikes = postData.likes.filter((el) => el.uid != user.uid);

      updateDoc(doc(db, "posts", postUser.uid + postUser.date), {
        likes: newLikes,
      });
    }
  };
};
