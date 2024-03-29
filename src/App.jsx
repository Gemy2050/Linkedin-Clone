import { Route, Routes, useNavigate, Navigate } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import { userAuth } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Items from "./pages/Items";
// import RequireAuth from "./components/RequireAuth";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userState);

  useEffect(() => {
    dispatch(userAuth());
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/items" element={<Items />} />
      </Routes>

      <div className="loader" id="loader">
        <img src="/images/loader.svg" alt="loader" />
      </div>
    </div>
  );
}

export default App;
