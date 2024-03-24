import React from "react";
import { useSelector } from "react-redux";

function PostDetailsModal() {
  const { post } = useSelector((state) => state.postState);

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
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              <div
                className="d-flex align-items-center gap-2"
                style={{ cursor: "pointer" }}
              >
                <img
                  src="https://static-exp1.licdn.com/sc/h/2uxqgankkcxm505qn812vqyss"
                  alt="likes"
                  loading="lazy"
                />
                <span>{post?.likes?.length}</span>
              </div>
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {post?.likes.map((el) => {
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
            })}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailsModal;
