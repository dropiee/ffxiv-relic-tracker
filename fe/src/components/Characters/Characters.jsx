import { useEffect, useReducer, useContext, useState } from "react";
import axios from "axios";
import CharacterCard from "./CharacterCard";
import MyContext from "../../MyContext";
import {
  characterReducer,
  initialState,
} from "../../reducers/characterReducer";
import { Link } from "react-router-dom";

const Characters = () => {
  const [state, dispatch] = useReducer(characterReducer, initialState);
  const { user } = useContext(MyContext);
  const [reload, setReload] = useState(false);
  const handleReload = () => {
    setReload((prev) => !prev);
  };

  const charList = state.characters.map((char, i) => {
    return (
      <CharacterCard
        key={char._id}
        charId={char._id}
        charName={char.charName}
        charWorld={char.charWorld}
        onReload={handleReload}
      />
    );
  });

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await axios.get(
        `https://ffxiv-relic-tracker-api.vercel.app/api/v1/users/${user.userId}`
      );

      localStorage.setItem("characters", JSON.stringify(data));
      dispatch({ type: "CHAR_LIST", payload: data });
    })();
  }, [state.characters.length, reload]);

  return <div className="flex justify-evenly py-10">{charList}</div>;
};

export default Characters;
