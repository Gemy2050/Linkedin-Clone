import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteItem,
  deletePost,
  deleteSharedPost,
  likePost,
  saveItem,
  sharePost,
} from "../redux/actions";
import Swal from "sweetalert2";
import { setDetails, setPost } from "../redux/actions/actions";

function Post({ el }) {
  const { user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (el.likes.find((el) => el.uid == user?.uid)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [el]);

  const handleDeletePost = () => {
    Swal.fire({
      title: `Are You Sure To Delete ${el.text}? `,
      icon: "warning",
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        if (el.shared) {
          dispatch(deleteSharedPost(el.sharedUser));
        } else {
          dispatch(deletePost(el));
        }
      }
    });
  };

  const handleIsLike = () => {
    setIsLiked(!isLiked);
    dispatch(likePost(user, el, isLiked));
  };

  const handleSharePost = () => {
    dispatch(setPost(el));

    Swal.fire({
      title: `Share This Post: ${el.text}? `,
      icon: "warning",
      showCancelButton: true,
    }).then((dataRes) => {
      if (dataRes.isConfirmed) {
        let data = {
          sharedUser: {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            date: Date.now(),
          },

          user: el.user,
          text: el.text,
          video: el.video,
          image: el.image,
        };

        dispatch(sharePost(data));
      }
    });
  };

  return (
    <>
      <div className="post mb-2 border rounded-3 position-relative">
        <div
          className="options"
          onClick={() => {
            setShowOptionsMenu(!showOptionsMenu);
          }}
        >
          <img src="/images/ellipsis.svg" alt="options" />
          {showOptionsMenu && (
            <ul className="p-3 rounded-3 shadow">
              <li
                className="border-bottom pb-2"
                onClick={() => {
                  if (el.saves.includes(user.uid)) {
                    dispatch(deleteItem(user, el));
                  } else {
                    dispatch(saveItem(user, el));
                  }
                }}
              >
                {el.saves.includes(user.uid)
                  ? "Remove from items"
                  : "Save to items"}
              </li>
              {((el?.user.uid == user?.uid && !el?.shared) ||
                el?.sharedUser?.uid == user?.uid) && (
                <>
                  {!el?.sharedUser?.uid && (
                    <li
                      className="border-bottom py-2"
                      data-bs-toggle="modal"
                      data-bs-target="#editPostModal"
                      onClick={() => dispatch(setPost(el))}
                    >
                      Edit Post
                    </li>
                  )}
                  <li className="pt-2" onClick={handleDeletePost}>
                    Delete Post
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
        <div className="head p-2 p-sm-3">
          {el?.sharedUser && (
            <div className="alert alert-secondary p-2">
              <div
                className="info d-flex gap-2 align-items-center"
                style={{ userSelect: "none" }}
              >
                <img
                  src={el?.sharedUser.photoURL}
                  alt="post"
                  className="rounded-circle"
                  loading="lazy"
                />
                <div style={{ minWidth: "150px" }}>
                  <h6 className="m-0">{el?.sharedUser.displayName}</h6>
                  <span className="text-secondary">
                    {new Date(el.sharedUser.date).toLocaleDateString([
                      "en-GB",
                    ]) +
                      " - " +
                      new Date(el.sharedUser.date).toLocaleTimeString(
                        ["en-GB"],
                        {
                          hour12: true,
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div
            className="info d-flex gap-2 align-items-center"
            style={{ userSelect: "none" }}
          >
            <img
              src={el?.user.photoURL}
              alt="post"
              className="rounded-circle"
              loading="lazy"
            />
            <div style={{ minWidth: "150px" }}>
              <h6 className="m-0">{el?.user.displayName}</h6>
              <span className="text-secondary">
                {new Date(el?.user.date).toLocaleDateString(["en-GB"]) +
                  " - " +
                  new Date(el?.user.date).toLocaleTimeString(["en-GB"], {
                    hour12: true,
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </span>
            </div>
          </div>
          <div className="caption mt-2">{el.text}</div>
        </div>
        {el.image ? (
          <div className="image border-top border-bottom">
            <img
              className="img-fluid w-100"
              src={el.image}
              alt="post"
              loading="lazy"
            />
          </div>
        ) : (
          el.video && (
            <div className="video border-bottom">
              <ReactPlayer url={el.video} width={"100%"} controls={true} />
            </div>
          )
        )}
        <div className="footer px-3 py-2" style={{ userSelect: "none" }}>
          <div className="info py-2 border-bottom d-flex gap-3 align-items-center text-secondary">
            <div
              className="likes-count d-flex align-items-center"
              style={{ cursor: "pointer" }}
              data-bs-toggle="modal"
              data-bs-target="#postDetails"
              onClick={() => {
                dispatch(setPost(el));
                dispatch(setDetails("like"));
              }}
            >
              <span className="me-1">{el.likes.length}</span>
              <img src="/images/liked.svg" alt="likes" loading="lazy" />
            </div>
            <div
              className="comments"
              style={{ cursor: "pointer" }}
              data-bs-toggle="modal"
              data-bs-target="#postDetails"
              onClick={() => {
                dispatch(setPost(el));
                dispatch(setDetails("comment"));
              }}
            >
              {el.comments.length} comment
            </div>
            <div className="shares">{el.shares.length} share</div>
          </div>
          <div className="icons pt-2 d-flex align-items-center">
            <button
              className="d-flex align-items-center justify-content-center gap-1"
              onClick={handleIsLike}
            >
              {isLiked ? (
                <img src="/images/liked.svg" alt="likes" loading="lazy" />
              ) : (
                <img src="/images/like-icon.svg" alt="like" loading="lazy" />
              )}
              <span
                className={`${isLiked ? "text-primary" : "text-secondary"}`}
              >
                Like
              </span>
            </button>
            <button
              className="d-flex align-items-center justify-content-center gap-1"
              data-bs-toggle="modal"
              data-bs-target="#postDetails"
              onClick={() => {
                dispatch(setPost(el));
                dispatch(setDetails("comment"));
              }}
            >
              <img
                src="/images/comment-icon.svg"
                alt="comment"
                loading="lazy"
              />
              <span className="text-secondary">Comment</span>
            </button>
            <button
              className="d-flex align-items-center justify-content-center gap-1"
              onClick={handleSharePost}
            >
              <img src="/images/share-icon.svg" alt="share" loading="lazy" />
              <span className="text-secondary">Share</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Post);
