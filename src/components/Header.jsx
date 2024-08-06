import { useSelector } from "react-redux";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function Header() {
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [seen, setSeen] = useState(true);
  const [notifiedID, setNotifiedID] = useState(null);

  let audio = new Audio(
    "https://gemy2050.github.io/chat/sound/notification.mp3"
  );

  useEffect(() => {
    if (user) {
      const unSub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        setNotifications(
          doc.data().notifications.sort((a, b) => b.date - a.date)
        );
        setSeen(doc.data().seen);
        setNotifiedID(doc.data().user.uid);

        if (!doc.data().seen) {
          audio.play();
        }
      });

      return () => {
        unSub();
      };
    }
  }, []);

  const toggleSeen = () => {
    if (seen) return;

    updateDoc(doc(db, "users", notifiedID), {
      seen: true,
    });
  };

  return (
    <div className="header sticky-top shadow-lg">
      <div className="container pt-2 d-flex gap-2 align-items-start justify-content-between">
        <div className="left d-flex gap-2 align-items-center">
          <img
            src="/images/linkedin.png"
            alt="logo"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/home");
            }}
          />
          <div className="search position-relative">
            <input
              type="search"
              placeholder="Search"
              className="form-control"
              style={{ paddingLeft: "35px" }}
            />
            <img
              src="/images/search-icon.svg"
              alt="search"
              className="position-absolute top-50"
              style={{ left: "20px", translate: "-50% -50%" }}
            />
          </div>
        </div>
        <ul className="right d-flex gap-3 text-center">
          <li>
            <div
              className="active text-center"
              onClick={() => {
                navigate("/home");
              }}
            >
              <img src="/images/nav-home.svg" alt="home" />
              <span className="d-block" style={{ fontSize: "12px" }}>
                Home
              </span>
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                alert("Not Available Now");
              }}
            >
              <img src="/images/nav-network.svg" alt="my network" />
              <span className="d-block" style={{ fontSize: "12px" }}>
                My Network
              </span>
            </div>
          </li>
          <li className="notifications position-relative">
            <div
              onClick={() => {
                setShowNotifications((prev) => !prev);
                toggleSeen();
              }}
            >
              <img src="/images/nav-notifications.svg" alt="notification" />
              <span className="d-block" style={{ fontSize: "12px" }}>
                Notifications
              </span>
              {!seen && <span className="notifications-count"></span>}
            </div>
            <div
              className={`list ${
                showNotifications && "d-block"
              } position-absolute rounded-3 shadow`}
            >
              {notifications.map((el, i) => {
                return (
                  <button
                    key={i}
                    to={`/postDetails/${el.postID}`}
                    className="item pb-3 d-flex align-items-center gap-3"
                  >
                    <img
                      src={el.photoURL}
                      className="rounded-circle"
                      alt="user"
                      loading="lazy"
                    />
                    <p className="m-0">
                      {el.displayName}{" "}
                      {el.type == "comment"
                        ? "commented on"
                        : el.type == "like"
                        ? "likes"
                        : "shares"}{" "}
                      your post{" "}
                      <span className="fw-bold">"{el.postTitle}"</span>
                    </p>
                  </button>
                );
              })}
            </div>
          </li>
          <li className="position-relative me">
            <div>
              <img
                src={user?.photoURL}
                alt="me"
                style={{ borderRadius: "50%" }}
              />
              <span className="d-block" style={{ fontSize: "12px" }}>
                Me
                <img
                  src="/images/down-icon.svg"
                  alt="arrow"
                  style={{ width: "15px", marginLeft: "5px" }}
                />
              </span>
            </div>
            <div className="sign-out">
              <p
                className="m-0 pb-1 border-bottom"
                onClick={() => navigate("/profile")}
              >
                Profile
              </p>
              <span
                className="pt-1 d-block"
                onClick={async () => await auth.signOut()}
              >
                Sign out
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
