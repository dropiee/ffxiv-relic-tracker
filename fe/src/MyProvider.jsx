import { useState } from "react";
import MyContext from "./MyContext";

const MyProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );
  const [isActive, setIsActive] = useState(
    localStorage.getItem("activeChar") ? true : false
  );
  const [activeChar, setActiveChar] = useState(
    localStorage.getItem("activeChar")
      ? JSON.parse(localStorage.getItem("activeChar"))
      : {}
  );
  const [reload, setReload] = useState(false);

  const state = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    isActive,
    setIsActive,
    activeChar,
    setActiveChar,
    reload,
    setReload,
  };

  return (
    <MyContext.Provider value={state}>{props.children}</MyContext.Provider>
  );
};

export default MyProvider;
