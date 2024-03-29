import "./Home.css";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import LeftSide from "../components/LeftSide";
import Main from "../components/Main";
import RightSide from "../components/RightSide";
import EditPostForm from "../components/EditPostForm";
import PostDetailsModal from "../components/PostDetailsModal";

function Home() {
  const { user } = useSelector((state) => state.userState);
  return (
    <div className="home">
      <Header />
      <div className="container py-3">
        <LeftSide user={user} />
        <Main />
        <RightSide />
      </div>
      <EditPostForm user={user} />
      <PostDetailsModal user={user} />
    </div>
  );
}

export default Home;
