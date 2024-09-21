import React from "react";

function NotificationItem({ el }) {
  return (
    <button
      to={`/postDetails/${el.postID}`}
      className="item pb-3 d-flex align-items-center gap-3"
    >
      <img
        src={el.photoURL}
        className="rounded-circle"
        alt="user"
        loading="lazy"
      />
      <p className="m-0">
        {el.displayName}{" "}
        {el.type == "comment"
          ? "commented on"
          : el.type == "like"
          ? "likes"
          : "shares"}{" "}
        your post <span className="fw-bold">"{el.postTitle}"</span>
      </p>
    </button>
  );
}

export default NotificationItem;
