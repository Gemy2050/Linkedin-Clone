import React from "react";
import { useNavigate } from "react-router-dom";

function LeftSide({ user }) {
  const navigate = useNavigate();
  return (
    <div className="left-side">
      <div style={{ position: "sticky", top: "70px" }}>
        <div className="rounded-3 border overflow-hidden bg-white">
          <div className="info text-center">
            <div className="bg-img"></div>
            <img
              src={user?.photoURL}
              className="rounded-circle"
              alt="user"
              onClick={() => navigate("/profile")}
            />
            <h6 onClick={() => navigate("/profile")}>{user?.displayName}</h6>
          </div>
          <div className="items">
            <p className="d-flex justify-content-between c-secondary">
              Profile Viewer <span className="text-primary">7</span>
            </p>
            <p className="c-secondary">All Analytics</p>
            <button
              className="items d-flex align-items-center gap-1"
              onClick={() => navigate("/items")}
            >
              <img src="/images/item-icon.svg" alt="items" />
              My Items
            </button>
          </div>
        </div>
        <div className="links rounded-3 border mt-2 bg-white">
          <p className="text-primary">Links</p>
          <p className="text-primary">Groups</p>
          <p className="text-primary">Hashtags</p>
          <button className="text-start">Discover More</button>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
