import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import MyContext from "../MyContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const HomeScreen = () => {
  const { isLoggedIn, isActive } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
    if (!isActive) navigate("/welcome");
  });
  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default HomeScreen;
