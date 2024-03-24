import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import Swal from "sweetalert2";
import { editPost } from "../redux/actions";
import { useDispatch } from "react-redux";

function EditPostForm({ user }) {
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const handleUpdate = () => {
    let videoLink = document.querySelector("#editVideoLink").value;
    let text = document.querySelector("#editTitleInput").value;
    let postID = document.querySelector("#postID").value;

    if (!text) {
      Swal.fire("Title can not be empty", "", "error");
      return;
    }

    dispatch(editPost({ user, text, videoLink, image, postID }));
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
                  ></textarea>
                </div>
                <div className="mb-3" id="editVideoContainer">
                  <label htmlFor="message-text" className="col-form-label">
                    Video Link:
                  </label>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Enter Video Link"
                    id="editVideoLink"
                  />
                </div>
                <div className="mb-3" id="editImageContainer">
                  <label htmlFor="message-text" className="col-form-label">
                    Image:
                  </label>
                  <input
                    type="file"
                    className="form-control mb-2"
                    accept="image/*"
                    id="editImageInput"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <img
                    src={image ? URL.createObjectURL(image) : ""}
                    className="img-fluid"
                    id="editImageView"
                  />
                </div>
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
