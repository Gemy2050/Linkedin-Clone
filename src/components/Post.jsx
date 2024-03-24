import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../redux/actions";
import Swal from "sweetalert2";
import { setPost } from "../redux/actions/actions";

function Post({ el }) {
  const { user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(
    el.likes.find((el) => el.uid == user?.uid)
  );

  const handleDeletePost = () => {
    Swal.fire({
      title: `Are You Sure To Delete ${el.text}? `,
      icon: "warning",
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        dispatch(deletePost(el));
      }
    });
  };

  const handleEditPost = () => {
    document.querySelector("#editTitleInput").value = el.text;
    document.querySelector("#postID").value = el.user.uid + el.user.date;
    if (el.image) {
      document.querySelector("#editVideoContainer").style.display = "none";
      document.querySelector("#editImageContainer").style.display = "block";
      document.querySelector("#editImageView").src = el.image;
      document.querySelector("#editVideoLink").value = "";
    } else if (el.video) {
      document.querySelector("#editVideoLink").value = el.video;
      document.querySelector("#editVideoContainer").style.display = "block";
      document.querySelector("#editImageContainer").style.display = "none";
    } else {
      document.querySelector("#editVideoContainer").style.display = "none";
      document.querySelector("#editImageContainer").style.display = "none";
      document.querySelector("#editVideoLink").value = "";
    }
  };

  const handleIsLike = () => {
    setIsLiked(!isLiked);
    dispatch(likePost(user, el.user, isLiked));
  };

  return (
    <>
      <div className="post mb-2 border rounded-3 position-relative">
        {el?.user.uid == user?.uid && (
          <div
            className="options"
            onClick={() => setShowOptionsMenu(!showOptionsMenu)}
          >
            <img
              src="https://linkedin-clone-723e6.web.app/images/ellipsis.svg"
              alt="options"
            />
            {showOptionsMenu && (
              <ul className="p-3 rounded-3 shadow">
                <li className="border-bottom pb-2">Share Post</li>
                <li
                  className="border-bottom py-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editPostModal"
                  onClick={handleEditPost}
                >
                  Edit Post
                </li>
                <li className="pt-2" onClick={handleDeletePost}>
                  Delete Post
                </li>
              </ul>
            )}
          </div>
        )}
        <div className="head p-2 p-sm-3">
          <div className="info d-flex gap-2 align-items-center">
            <img
              src={el?.user.photoURL}
              alt="post"
              className="rounded-circle"
              loading="lazy"
            />
            <div>
              <h6 className="m-0">{el?.user.displayName}</h6>
              <span className="text-secondary">
                {new Date(el?.user.date).toLocaleDateString() +
                  " - " +
                  new Date(el?.user.date).toLocaleTimeString().slice(0, -3)}
              </span>
            </div>
          </div>
          <div className="caption mt-2">{el.text}</div>
        </div>
        {el.image ? (
          <div className="image">
            <img
              className="img-fluid"
              src={el.image}
              alt="post"
              loading="lazy"
            />
          </div>
        ) : (
          el.video && (
            <div className="video">
              <ReactPlayer url={el.video} width={"100%"} controls={true} />
            </div>
          )
        )}
        <div className="footer px-3 py-2">
          <div className="info py-2 border-bottom d-flex gap-3 align-items-center text-secondary">
            <div
              className="likes-count d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#postDetails"
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(setPost(el))}
            >
              <img
                src="https://static-exp1.licdn.com/sc/h/2uxqgankkcxm505qn812vqyss"
                alt="likes"
                loading="lazy"
              />
              <span className="ms-1">{el.likes.length}</span>
            </div>
            <div className="comments">{el.comments.length} comment</div>
            <div className="shares">{el.shares} share</div>
          </div>
          <div className="icons pt-2 d-flex align-items-center">
            <button
              className="d-flex align-items-center justify-content-center gap-1"
              onClick={handleIsLike}
            >
              {isLiked ? (
                <img
                  src="https://static-exp1.licdn.com/sc/h/2uxqgankkcxm505qn812vqyss"
                  alt="likes"
                  loading="lazy"
                />
              ) : (
                <img src="/images/like-icon.svg" alt="like" loading="lazy" />
              )}
              <span className="text-secondary">Like</span>
            </button>
            <button className="d-flex align-items-center justify-content-center gap-1">
              <img
                src="/images/comment-icon.svg"
                alt="comment"
                loading="lazy"
              />
              <span className="text-secondary">Comment</span>
            </button>
            <button className="d-flex align-items-center justify-content-center gap-1">
              <img src="/images/share-icon.svg" alt="share" loading="lazy" />
              <span className="text-secondary">Share</span>
            </button>
            <button className="d-none d-flex align-items-center justify-content-center gap-1">
              <img src="/images/send-icon.svg" alt="send" loading="lazy" />
              <span className="text-secondary">Send</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
