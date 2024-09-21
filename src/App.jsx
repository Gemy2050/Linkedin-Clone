import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import { showItems, showPosts, userAuth } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Items from "./pages/Items";
import RequireAuth from "./components/RequireAuth";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/FixScroll";

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

function App() {
  const { user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuth());
    dispatch(showPosts());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(showItems(user?.uid));
    }
  }, [user]);

  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<LoginPage />} />
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
        className={`btn btn-sm btn-primary`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        up
      </button>

      <Toaster
        toastOptions={{ style: { background: "#333", color: "#fff" } }}
      />
    </div>
  );
}

export default App;
