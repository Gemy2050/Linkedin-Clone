import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import { userAuth } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Items from "./pages/Items";
import RequireAuth from "./components/RequireAuth";

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
      </Routes>

      <div className="loader" id="loader">
        <img src="/images/loader.svg" alt="loader" />
      </div>
    </div>
  );
}

export default App;
