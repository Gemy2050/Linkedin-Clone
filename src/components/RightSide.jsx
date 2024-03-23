import React from "react";

function RightSide() {
  return (
    <div className="right-side">
      <div style={{ position: "sticky", top: "70px", borderRadius: "8px" }}>
        <div className="tags p-3">
          <h6 className="d-flex justify-content-between align-items-center mb-3">
            Add to your feeds
            <img src="/images/feed-icon.svg" alt="Feeds" loading="lazy" />
          </h6>
          <div className="tag d-flex gap-2 align-items-center">
            <img
              src="/images/linkedin.png"
              alt="hashtag"
              className="rounded-circle"
              loading="lazy"
            />
            <div className="tag-info">
              <span className="d-block mb-1">#Linkedin</span>
              <button className="btn btn-sm rounded-pill">+ Follow</button>
            </div>
          </div>
          <div className="tag d-flex gap-2 align-items-center mt-3">
            <img
              src="/images/linkedin.png"
              alt="hashtag"
              className="rounded-circle"
              loading="lazy"
            />
            <div className="tag-info">
              <span className="d-block mb-1">#Linkedin</span>
              <button className="btn btn-sm rounded-pill">+ Follow</button>
            </div>
          </div>
          <p className="text-primary mt-3 mb-0">View all.. </p>
        </div>
        <div className="bg-img p-3 rounded-3 mt-2">
          <img
            src="/images/banner-image.jpg"
            className="img-fluid"
            alt="banner"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default RightSide;
