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
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
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
      .then(async (payload) => {
        dispatch(all.setUser(payload.user));

        let userDoc = await getDoc(doc(db, "users", payload.user.uid));
        if (!userDoc.exists()) {
          setDoc(doc(db, "users", payload.user.uid), {
            user: {
              displayName: payload.user.displayName,
              email: payload.user.email,
              photoURL: payload.user.photoURL,
              uid: payload.user.uid,
            },
            posts: [],
            items: [],
            connections: [],
            notifications: [],
            seen: true,
          });
        }
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
              shares: [],
              likes: [],
              saves: [],
              date: Date.now(),
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
        shares: [],
        likes: [],
        saves: [],
        date: Date.now(),
      }).then(() => dispatch(all.setLoading(false)));
    }
  };
}

export const showPosts = () => {
  return (dispatch) => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("date", "desc"));
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

export const deleteSharedPost = (sharedUser) => {
  return (dispatch) => {
    dispatch(all.setLoading(true));
    deleteDoc(doc(db, "posts", sharedUser.uid + sharedUser.date)).then(() =>
      dispatch(all.setLoading(false))
    );
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

function updateNotification(user, post, type) {
  let postID = post.user.uid + post.user.date;
  let userToNotify = post.user.uid;
  if (post.shared) {
    postID = post.sharedUser.uid + post.sharedUser.date;
  }
  if (post.shared) {
    userToNotify = post.sharedUser.uid;
  }
  if (user.uid != userToNotify) {
    updateDoc(doc(db, "users", userToNotify), {
      notifications: arrayUnion({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        date: Date.now(),
        postID,
        postTitle: post.text,
        type: type,
      }),
      seen: false,
    });
  }
}

export const likePost = (user, post, isLiked) => {
  return async (dispatch) => {
    let postID = post.user.uid + post.user.date;
    if (post.shared) {
      postID = post.sharedUser.uid + post.sharedUser.date;
    }
    if (!isLiked) {
      updateDoc(doc(db, "posts", postID), {
        likes: arrayUnion({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        }),
      });
      updateNotification(user, post, "like");
    } else {
      let postDoc = await getDoc(doc(db, "posts", postID));
      let postData = postDoc.data();
      let newLikes = postData.likes.filter((el) => el.uid != user.uid);

      updateDoc(doc(db, "posts", postID), {
        likes: newLikes,
      });
    }
  };
};

export const commentOnPost = ({ user, post, commentValue }) => {
  return (dispatch) => {
    let postID = post.user.uid + post.user.date;
    if (post.shared) {
      postID = post.sharedUser.uid + post.sharedUser.date;
    }
    updateDoc(doc(db, "posts", postID), {
      comments: arrayUnion({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        date: Date.now(),
        comment: commentValue,
      }),
    });

    updateNotification(user, post, "comment");
  };
};

export const sharePost = ({ sharedUser, user, text, video, image }) => {
  return (dispatch) => {
    dispatch(all.setLoading(true));

    updateDoc(doc(db, "posts", user.uid + user.date), {
      shares: arrayUnion({
        displayName: sharedUser.displayName,
        email: sharedUser.email,
        photoURL: sharedUser.photoURL,
        uid: sharedUser.uid,
      }),
    });

    setDoc(doc(db, "posts", sharedUser.uid + sharedUser.date), {
      sharedUser,
      user,
      text,
      image,
      video,
      shared: true,
      comments: [],
      shares: [],
      likes: [],
      saves: [],
      date: sharedUser.date,
    }).then(() => dispatch(all.setLoading(false)));
  };
};

export const refreshPost = (post) => {
  return async (dispatch) => {
    let postID = post.user.uid + post.user.date;
    if (post.shared) {
      postID = post.sharedUser.uid + post.sharedUser.date;
    }
    let postDoc = await getDoc(doc(db, "posts", postID));
    let postData = postDoc.data();
    dispatch(all.setPost(postData));
  };
};

export const getPost = (postID) => {
  return async (dispatch) => {
    let postDoc = await getDoc(doc(db, "posts", postID));
    let postData = postDoc.data();
    dispatch(all.setPost(postData));
  };
};

export const saveItem = (user, el) => {
  return (dispatch) => {
    let theDate = el.user.date;
    if (el.shared) {
      theDate = el.sharedUser.date;
    }
    updateDoc(doc(db, "posts", user.uid + theDate), {
      saves: arrayUnion(user.uid),
    });

    updateDoc(doc(db, "users", user.uid), {
      items: arrayUnion({
        ...el,
        saves: [...el.saves, user.uid],
      }),
    });
    Swal.fire("Saved to items", "", "success");
  };
};

export const deleteItem = (user, el) => {
  return async (dispatch) => {
    let theDate = el.user.date;
    if (el.shared) {
      theDate = el.sharedUser.date;
    }

    let postDoc = await getDoc(doc(db, "users", user.uid));
    let postData = postDoc.data();
    let newItems = postData.items.filter((item) => item.date != el.date);
    updateDoc(doc(db, "users", user.uid), {
      items: newItems,
    });

    updateDoc(doc(db, "posts", user.uid + theDate), {
      saves: arrayRemove(user.uid),
    });
    Swal.fire("Deleted From items", "", "success");
  };
};

export const showItems = (id) => {
  return (dispatch) => {
    dispatch(all.setLoading(true));
    let data;
    let unSub = onSnapshot(doc(db, "users", id), (snapshot) => {
      data = snapshot.data().items;
      dispatch(all.getItems(data));
      dispatch(all.setLoading(false));
    });
    return unSub;
  };
};
