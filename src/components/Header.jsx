import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate();

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
            <div>
              <img src="/images/nav-network.svg" alt="my network" />
              <span className="d-block" style={{ fontSize: "12px" }}>
                My Network
              </span>
            </div>
          </li>
          <li>
            <div>
              <img src="/images/nav-notifications.svg" alt="notification" />
              <span className="d-block" style={{ fontSize: "12px" }}>
                Notifications
              </span>
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
                  src="images/down-icon.svg"
                  alt="arrow"
                  style={{ width: "15px", marginLeft: "5px" }}
                />
              </span>
            </div>
            <div
              className="sign-out"
              onClick={async () => await auth.signOut()}
            >
              Sign out
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
