import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/actions";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

function LoginForm() {
  const { user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || "/home";
  useEffect(() => {
    user && navigate(redirectPath, { replace: true });
  }, [user]);

  return (
    <div className="form">
      <div className="mb-3">
        <label htmlFor="email" className="form-label text-muted">
          Email address
        </label>
        <input
          type="email"
          className="form-control px-3 py-2 border border-2 "
          id="email"
        />
      </div>
      <div className="mb-3 position-relative">
        <label htmlFor="password" className="form-label text-muted">
          Password
        </label>
        <input
          type="password"
          className="form-control px-3 py-2 border border-2"
          id="password"
        />
        <span
          className="position-absolute text-primary"
          style={{
            right: "10px",
            bottom: "10px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          show
        </span>
      </div>
      <span className="text-primary" style={{ cursor: "pointer" }}>
        Forget Password
      </span>
      <button
        className="mt-4 rounded-5 btn btn-primary d-block w-100"
        style={{ padding: "12px" }}
      >
        Sign in
      </button>
      <div className="position-relative mt-4 ">
        <hr />
        <span
          className="position-absolute p-2 rounded-circle"
          style={{
            left: "50%",
            top: "50%",
            translate: "-50% -50%",
            background: "#f5f5f5",
          }}
        >
          or
        </span>
      </div>
      <button
        className="googleBtn btn bg-light w-100 mt-3 rounded-pill border border-black"
        onClick={() => dispatch(signIn())}
      >
        <img
          src="/images/google.svg"
          className="me-2"
          style={{ width: "30px" }}
          alt="google"
        />
        Continue with Google
      </button>
    </div>
  );
}

export default LoginForm;
