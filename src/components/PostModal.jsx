import React, { useState } from "react";
import ReactPlayer from "react-player";
import { uploadData } from "../redux/actions";
import { useDispatch } from "react-redux";
import { Timestamp } from "firebase/firestore";

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
        date: Timestamp.now(),
      },
      text,
      image,
      video,
      comments: 0,
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
                  onChange={handleImage}
                />
                <label
                  htmlFor="imageInput"
                  className="d-block text-primary m-auto mb-4"
                  style={{ cursor: "pointer", width: "fit-content" }}
                >
                  upload image to share
                </label>
                <div
                  id="progress"
                  className="text-primary rounded-3 mb-2"
                  style={{ height: "5px" }}
                ></div>
                <img
                  src={image && URL.createObjectURL(image)}
                  className="img-fluid"
                />
              </div>
            ) : (
              postType === "video" && (
                <div>
                  <input
                    type="text"
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
  );
}

export default PostModal;
