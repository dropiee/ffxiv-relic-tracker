import { Link } from "react-router-dom";
import MyContext from "../../MyContext";
import { useContext } from "react";
import DeleteCharacter from "./DeleteCharacter";

const Characters = ({ charId, charName, charWorld, onReload }) => {
  const { setIsActive, setActiveChar } = useContext(MyContext);

  const handleCharSelect = () => {
    const data = { charId, charName, charWorld };
    localStorage.setItem("activeChar", JSON.stringify(data));
    setIsActive(true);
    setActiveChar(data);
  };

  return (
    <>
      <div>
        <div className="card">
          <Link to="/" onClick={handleCharSelect}>
            <div className="circle"></div>
            <h1 className="text-xl font-bold">{charName}</h1>
            <h2>{charWorld}</h2>
          </Link>
        </div>
        <div className="text-xs text-center mt-5 text-blue-400">
          <DeleteCharacter charId={charId} onReload={onReload} />
        </div>
      </div>
    </>
  );
};

export default Characters;
