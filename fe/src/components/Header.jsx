import { useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../MyContext";

const Header = () => {
  const { user, setIsLoggedIn, isActive, setIsActive, activeChar } =
    useContext(MyContext);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsActive(false);
  };

  const activeCharName = () => {
    if (isActive) {
      return activeChar.charName;
    }
    return;
  };

  return (
    <header className="header">
      <Link to="/" className="text-4xl ml-5 font-bold">
        FFXIV Relic Tracker
      </Link>
      <div className="flex gap-3 items-center px-3">
        <div className="flex flex-col text-center">
          <span className="font-bold">
            {isActive
              ? `${activeChar.charName} (${activeChar.charWorld})`
              : "No Character Selected"}
          </span>
          <Link to="/welcome" className="text-blue-400 font-semibold">
            {isActive ? "Change Character" : "Select Character"}
          </Link>
        </div>
        <div className="flex flex-col">
          <span>Hello, {user.username}</span>
          <Link to="/login" onClick={logout} className="button">
            Sign out
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
