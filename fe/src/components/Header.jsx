import { useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../MyContext";

const Header = () => {
  const { user, isLoggedIn, setIsLoggedIn, isActive, setIsActive, activeChar } =
    useContext(MyContext);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsActive(false);
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img
          src="../../images/ffxiv-relic-tracker.png"
          alt="FFXIV Relic Tracker"
        />
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
          {isLoggedIn ? (
            <span>Hello, {user.username}</span>
          ) : (
            <span>Not logged in</span>
          )}
          <Link to="/login" onClick={logout} className="button">
            {isLoggedIn ? "Sign out" : "Log in"}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
