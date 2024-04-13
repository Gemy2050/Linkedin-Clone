import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDetails } from "../redux/actions/actions";
import { commentOnPost, refreshPost } from "../redux/actions";

function PostDetailsModal({ user }) {
  const { post, details } = useSelector((state) => state.postState);
  const { posts } = useSelector((state) => state.postsState);

  const dispatch = useDispatch();
  const [commentValue, setCommentValue] = useState("");

  const commentRef = useRef();

  useEffect(() => {
    if (post) {
      dispatch(refreshPost(post));
    }
  }, [posts]);

  const handleComment = () => {
    if (commentValue.trim() == "") {
      return false;
    }

    dispatch(commentOnPost({ user, post, commentValue }));
    setCommentValue("");
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="modal fade"
      id="postDetails"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="modal-title fs-6 d-flex align-items-center gap-4"
              id="staticBackdropLabel"
            >
              <div
                className={`d-flex align-items-center gap-1 pb-2 border-2 border-bottom ${
                  details == "like" && " border-primary"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(setDetails("like"));
                }}
              >
                <span>{post?.likes?.length}</span>
                <img src="/images/liked.svg" alt="likes" loading="lazy" />
              </div>
              <div
                className={`d-flex align-items-center gap-1 pb-2 border-2 border-bottom ${
                  details == "comment" && " border-primary"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(setDetails("comment"));
                }}
              >
                <span>{post?.comments?.length}</span>
                <img
                  src="/images/comment-icon.svg"
                  alt="comments"
                  loading="lazy"
                />
              </div>
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            className="modal-body mb-3 pb-0 d-flex flex-column"
            style={{ height: "100vh" }}
          >
            {details === "like" ? (
              post.likes.length > 0 ? (
                post?.likes.map((el) => {
                  return (
                    <div
                      key={el.uid}
                      className="p-2 d-flex align-items-center gap-2 border-bottom"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={el.photoURL}
                        alt="user"
                        loading="lazy"
                        className="rounded-circle"
                        style={{ width: "40px" }}
                      />
                      <span>{el.displayName}</span>
                    </div>
                  );
                })
              ) : (
                <h6 className="text-secondary text-center mb-4">No Likes</h6>
              )
            ) : (
              <>
                {post?.comments?.length > 0 ? (
                  post.comments.map((el) => {
                    return (
                      <div
                        key={el.date}
                        className="p-2 d-flex align-items-start gap-2 border-bottom mb-2"
                        style={{ cursor: "pointer" }}
                        ref={commentRef}
                      >
                        <img
                          src={el.photoURL}
                          alt="user"
                          loading="lazy"
                          className="rounded-circle"
                          style={{ width: "40px" }}
                        />
                        <div>
                          <span>{el.displayName}</span>
                          <p
                            className="m-0 bg-dark text-white px-3 py-2 rounded-3"
                            style={{ fontSize: "14px" }}
                          >
                            {el.comment}
                          </p>
                          <span
                            className="text-secondary"
                            style={{ fontSize: "12px" }}
                          >
                            {new Date(el.date).toLocaleDateString(["en-GB"]) +
                              " - " +
                              new Date(el.date).toLocaleTimeString(["en-GB"], {
                                hour12: true,
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h6 className="text-secondary text-center mb-4">
                    No Comments
                  </h6>
                )}
                <div className="sticky-bottom mt-auto bg-white d-flex align-items-center gap-1 mt-3 py-2">
                  <input
                    placeholder="type your comment.."
                    className="form-control"
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={handleComment}>
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PostDetailsModal);
