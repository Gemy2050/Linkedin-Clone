import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import { showPosts, userAuth } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Items from "./pages/Items";
import RequireAuth from "./components/RequireAuth";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuth());
    dispatch(showPosts());
  }, []);

  window.onscroll = () => {
    if (window.scrollY > 2000) {
      document
        .querySelector("#scroll")
        .style.setProperty("right", "15px", "important");
    } else {
      document
        .querySelector("#scroll")
        .style.setProperty("right", "-50px", "important");
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/items"
          element={
            <RequireAuth>
              <Items />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>

      <div className="loader" id="loader">
        <img src="/images/loader.svg" alt="loader" />
      </div>
      <button
        id="scroll"
        className={`btn btn-sm btn-primary position-fixed`}
        style={{
          right: "-50px",
          bottom: "15px",
          transition: ".5s",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        up
      </button>
    </div>
  );
}

export default App;
