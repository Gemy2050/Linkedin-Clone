import React, { useEffect } from "react";
import PostModal from "./PostModal";
import { useDispatch, useSelector } from "react-redux";
import { showPosts } from "../redux/actions";
import Post from "./Post";
import EditPostForm from "./EditPostForm";
import PostDetailsModal from "./PostDetailsModal";

function Main() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userState);
  const { posts, loading } = useSelector((state) => state.postsState);

  useEffect(() => {
    dispatch(showPosts());
  }, []);

  return (
    <div className="main">
      <PostModal user={user} />
      <EditPostForm user={user} />
      {posts && <PostDetailsModal user={user} />}
      <div className="posts mt-2">
        {loading && (
          <div className="text-center">
            <img
              src="/images/loader.svg"
              alt="loader"
              style={{ width: "60px" }}
            />
          </div>
        )}
        {posts.length > 0 && posts.map((post, i) => <Post key={i} el={post} />)}
      </div>
    </div>
  );
}

export default Main;
