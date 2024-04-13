import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import { userAuth } from "./redux/actions";
import { useDispatch } from "react-redux";
import Items from "./pages/Items";
import RequireAuth from "./components/RequireAuth";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuth());
  }, []);

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
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <div className="loader" id="loader">
        <img src="/images/loader.svg" alt="loader" />
      </div>
    </div>
  );
}

export default App;
