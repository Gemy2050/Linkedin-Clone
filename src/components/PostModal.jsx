import React, { useState } from "react";
import ReactPlayer from "react-player";
import { uploadData } from "../redux/actions";
import { useDispatch } from "react-redux";

function PostModal({ user }) {
  const [postType, setPostType] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");

  const dispatch = useDispatch();

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleArticle = (e) => {
    setIsDisabled(["", " ", null].includes(e.target.value.trim()));
    setText(e.target.value);
  };

  const switchMedia = (media) => {
    setPostType(media);
    setImage("");
    setVideo("");
  };

  const createPost = () => {
    let data = {
      user: {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        date: Date.now(),
      },
      text,
      image,
      video,
    };

    dispatch(uploadData(data));
    reset();
  };

  const reset = () => {
    setPostType("");
    setText("");
    setImage("");
    setVideo("");
    setIsDisabled(true);
  };

  return (
    <>
      <div className="post-modal rounded-3 bg-white">
        <div className="top d-flex align-items-center gap-2">
          <img src={user?.photoURL} alt="user" className="rounded-circle" />
          <button
            className="w-100 rounded-pill text-start"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={() => switchMedia("")}
          >
            Start a post
          </button>
        </div>
        <div className="icons mt-3 mb-2 d-flex  align-items-center justify-content-between gap-1">
          <button
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={() => switchMedia("image")}
          >
            <img src="/images/photo-icon.svg" alt="share photo" />
            <span>Photo</span>
          </button>
          <button
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={() => switchMedia("video")}
          >
            <img src="/images/video-icon.svg" alt="share video" />
            <span>Video</span>
          </button>
          <button
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={() => switchMedia("")}
          >
            <img src="/images/article-icon.svg" alt="share article" />
            <span>Article</span>
          </button>
          <button>
            <img src="/images/event-icon.svg" alt="share event" />
            <span>Event</span>
          </button>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Create a Post
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="top mb-3 d-flex align-items-center gap-2">
                <img
                  src={user?.photoURL}
                  alt="user"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                />
                <h5 className="m-0">{user?.displayName}</h5>
              </div>
              <textarea
                className="p-2 ps-3 w-100 text-start"
                placeholder="what do you wanna talk about?"
                style={{ minHeight: "120px", resize: "none" }}
                value={text}
                onChange={handleArticle}
              ></textarea>
              {postType === "image" ? (
                <div className="text-center">
                  <input
                    type="file"
                    id="imageInput"
                    hidden
                    accept="image/*"
                    onChange={handleImage}
                  />
                  <label
                    htmlFor="imageInput"
                    className="d-block text-primary m-auto mb-4"
                    style={{ cursor: "pointer", width: "fit-content" }}
                  >
                    upload image to share
                  </label>
                  <img
                    src={image && URL.createObjectURL(image)}
                    className="img-fluid"
                  />
                </div>
              ) : (
                postType === "video" && (
                  <div>
                    <input
                      type="search"
                      id="videoInput"
                      placeholder="Enter video link"
                      className="border p-2 rounded-2 w-100 mb-3"
                      onChange={(e) => setVideo(e.target.value)}
                    />
                    {video && <ReactPlayer url={video} width="100%" />}
                  </div>
                )
              )}
            </div>
            <div className="modal-footer border-0 d-flex">
              <div className="share-btns d-flex align-items-center gap-2 me-auto border-end pe-2">
                <button
                  className="p-2 rounded-circle bg-transparent"
                  onClick={() => switchMedia("image")}
                >
                  <img src="/images/share-image.svg" alt="share image" />
                </button>
                <button
                  className="p-2 rounded-circle bg-transparent"
                  onClick={() => switchMedia("video")}
                >
                  <img src="/images/share-video.svg" alt="share video" />
                </button>
              </div>
              <button
                type="button"
                id="createPost"
                className="btn btn-primary rounded-pill"
                data-bs-dismiss="modal"
                disabled={isDisabled}
                onClick={createPost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostModal;
