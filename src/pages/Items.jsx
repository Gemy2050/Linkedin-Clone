import React, { useEffect } from "react";
import LeftSide from "../components/LeftSide";
import Header from "../components/Header";
import RightSide from "../components/RightSide";
import { useDispatch, useSelector } from "react-redux";
import EditPostForm from "../components/EditPostForm";
import PostDetailsModal from "../components/PostDetailsModal";

import "./Home.css";
import Post from "../components/Post";
import { showItems } from "../redux/actions";

function Items() {
  const { user } = useSelector((state) => state.userState);
  const { items } = useSelector((state) => state.itemsState);

  const dispatch = useDispatch();

  useEffect(() => {
    let unSub = dispatch(showItems(user.uid));
    return () => {
      unSub();
    };
  }, []);

  console.log("items", items);

  return (
    <div className="items">
      <Header />
      <div className="container py-3 d-flex gap-3">
        <LeftSide user={user} />
        <div className="main">
          <h1 className="text-center text-secondary mb-3">Saved items</h1>
          <EditPostForm user={user} />
          <PostDetailsModal user={user} />
          <div className="posts mt-2">
            {items?.length > 0 &&
              items.map((post, i) => <Post key={i} el={post} />)}
          </div>
        </div>
        <RightSide />
      </div>
    </div>
  );
}

export default Items;
