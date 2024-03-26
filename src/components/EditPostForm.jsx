import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { editPost } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function EditPostForm({ user }) {
  const [image, setImage] = useState("");
  const [isImageURL, setISImageURL] = useState(false);
  const [text, setText] = useState("");
  const [video, setVideo] = useState("");

  const { post } = useSelector((state) => state.postState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setText(post.text);
      setVideo(post.video);
      setISImageURL(true);
    }
  }, [post]);

  const handleUpdate = () => {
    if (!text) {
      Swal.fire("Title can not be empty", "", "error");
      return;
    }

    dispatch(
      editPost({
        text,
        videoLink: video,
        image,
        postID: post.user.uid + post.user.date,
      })
    );
    setImage("");
  };

  return (
    <>
      <div
        className="modal fade "
        id="editPostModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Post
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="col-form-label">
                    Title
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="what do you wanna talk about?"
                    id="editTitleInput"
                    required
                    style={{ resize: "none", minHeight: "90px" }}
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  ></textarea>
                </div>
                {video && (
                  <div className="mb-3" id="editVideoContainer">
                    <label htmlFor="message-text" className="col-form-label">
                      Video Link:
                    </label>
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Enter Video Link"
                      id="editVideoLink"
                      value={video}
                      onChange={(e) => setVideo(e.target.value)}
                    />
                  </div>
                )}
                {image && (
                  <div className="mb-3" id="editImageContainer">
                    <label htmlFor="message-text" className="col-form-label">
                      Image:
                    </label>
                    <input
                      type="file"
                      className="form-control mb-2"
                      accept="image/*"
                      id="editImageInput"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        setISImageURL(false);
                      }}
                    />
                    <img
                      src={isImageURL ? post.image : URL.createObjectURL(image)}
                      className="img-fluid"
                      id="editImageView"
                    />
                  </div>
                )}
                <input type="text" id="postID" hidden />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPostForm;
