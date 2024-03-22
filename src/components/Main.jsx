import React, { useEffect } from "react";
import PostModal from "./PostModal";
import { useDispatch, useSelector } from "react-redux";
import { showPosts } from "../redux/actions";
import ReactPlayer from "react-player";

function Main() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userState);
  const { posts, loading } = useSelector((state) => state.postsState);
  console.log(posts);
  useEffect(() => {
    dispatch(showPosts());
  }, []);

  return (
    <div className="main">
      <PostModal user={user} />
      <div className="post-modal rounded-3 bg-white">
        <div className="top d-flex align-items-center gap-2">
          <img src={user?.photoURL} alt="user" className="rounded-circle" />
          <button
            className="w-100 rounded-pill text-start"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Start a post
          </button>
        </div>
        <div className="icons mt-3 mb-2 d-flex  align-items-center justify-content-between gap-1">
          <button>
            <img src="/images/photo-icon.svg" alt="share photo" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.svg" alt="share video" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/event-icon.svg" alt="share event" />
            <span>Event</span>
          </button>
          <button>
            <img src="/images/article-icon.svg" alt="share article" />
            <span>Article</span>
          </button>
        </div>
      </div>
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
        {posts.length > 0 &&
          posts.map((el, i) => (
            <div
              key={i}
              className="post mb-2 border rounded-3 position-relative"
            >
              <div className="options">
                <img
                  src="https://linkedin-clone-723e6.web.app/images/ellipsis.svg"
                  alt="options"
                />
              </div>
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
                      {el.user.date.toDate().toLocaleDateString() +
                        "-" +
                        el.user.date.toDate().toLocaleTimeString()}
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
                    <ReactPlayer url={el.video} width={"100%"} />
                  </div>
                )
              )}
              <div className="footer px-3 py-2">
                <div className="info py-2 border-bottom d-flex gap-3 align-items-center text-secondary">
                  <div className="likes-count d-flex align-items-center">
                    <img
                      src="https://static-exp1.licdn.com/sc/h/2uxqgankkcxm505qn812vqyss"
                      alt="likes"
                      loading="lazy"
                    />
                    <img
                      src="https://static-exp1.licdn.com/sc/h/f58e354mjsjpdd67eq51cuh49"
                      alt="likes"
                      loading="lazy"
                    />
                    <span className="ms-1">20</span>
                  </div>
                  <div className="comments">{el.comments} comment</div>
                  <div className="shares">2 share</div>
                </div>
                <div className="icons pt-2 d-flex align-items-center">
                  <button className="d-flex align-items-center justify-content-center gap-1">
                    <img src="/images/like-icon.svg" alt="like" />
                    <span className="text-secondary">Like</span>
                  </button>
                  <button className="d-flex align-items-center justify-content-center gap-1">
                    <img src="/images/comment-icon.svg" alt="comment" />
                    <span className="text-secondary">Comment</span>
                  </button>
                  <button className="d-flex align-items-center justify-content-center gap-1">
                    <img src="/images/share-icon.svg" alt="share" />
                    <span className="text-secondary">Share</span>
                  </button>
                  <button className="d-none d-flex align-items-center justify-content-center gap-1">
                    <img src="/images/send-icon.svg" alt="send" />
                    <span className="text-secondary">Send</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Main;
