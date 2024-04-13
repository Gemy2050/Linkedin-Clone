import React, { useEffect, useState } from "react";
import "./Profile.css";
import Header from "../components/Header";

import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import PostDetailsModal from "../components/PostDetailsModal";

function Profile() {
  const { user } = useSelector((state) => state.userState);
  // let { posts, loading } = useSelector((state) => state.postsState);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const getPosts = async () => {
    let q = collection(db, "posts");
    let arr = [];
    let postsDocs = await getDocs(q);
    postsDocs.forEach((doc) => {
      let el = doc.data();
      // console.log(el);
      // console.log("is shared", el.shared && el.sharedUser?.uid == user?.uid);
      // console.log("--------------------");
      if (el?.shared) {
        arr.push(el);
      } else if (el?.user.uid == user?.uid) {
        arr.push(el);
      }
    });
    setPosts(arr.reverse());
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="profile">
      <PostDetailsModal user={user} />
      <Header />
      <div className="container py-3">
        <div className="box col-md-8 mb-3 mx-auto pb-3 bg-white rounded-3 overflow-hidden">
          <img src="/images/card-bg.svg" className="cover" alt="cover" />
          <div className="user-info px-3 px-md-4">
            <img src={user?.photoURL} alt="avatar" className="avatar mb-2" />
            <h4>{user?.displayName}</h4>
            <p className="text-secondary m-0" style={{ fontSize: "14px" }}>
              {user?.email}
            </p>
            <span className="text-primary" style={{ fontSize: "14px" }}>
              {" "}
              0 Connections
            </span>
          </div>
        </div>
        <div className="box col-md-8 mb-3 mx-auto p-3 bg-white rounded-3">
          <h5 className="mb-4">Analytics</h5>
          <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-5 justify-content-between">
            <div>
              <span className="text-primary">0 profile views</span>
              <p className="w-7" style={{ fontSize: "14px" }}>
                Discover who's viewed your profile.
              </p>
            </div>
            <div>
              <span className="text-primary">{posts.length} posts</span>
              <p className="w-7" style={{ fontSize: "14px" }}>
                share posts with connections
              </p>
            </div>
            <div>
              <span className="text-primary">0 items</span>
              <p className="w-7" style={{ fontSize: "14px" }}>
                browse your items
              </p>
            </div>
          </div>
        </div>
        <div className="posts col-md-6 mb-3 mx-auto p-3 rounded-3">
          <h2 className="text-center text-muted mt-5 mb-4">
            {user?.displayName} Posts
          </h2>
          <div className="posts mt-2">
            {posts?.length > 0 &&
              posts
                .filter((el) => el.user.uid == user.uid)
                .map((post, i) => <Post key={i} el={post} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
