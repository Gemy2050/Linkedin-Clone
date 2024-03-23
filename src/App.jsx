import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import { userAuth } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate();

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
      </Routes>
      <div className="loader" id="loader">
        <img src="/images/loader.svg" alt="" />
      </div>
    </div>
  );
}

export default App;
