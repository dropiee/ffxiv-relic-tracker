import axios from "axios";
import React, { useContext, useReducer } from "react";
import MyContext from "../../MyContext";
import {
  characterReducer,
  initialState,
} from "../../reducers/characterReducer";

const DeleteCharacter = ({ charId, onReload }) => {
  const {
    user: { accessToken },
  } = useContext(MyContext);
  const [state, dispatch] = useReducer(characterReducer, initialState);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const deleteChar = await axios.delete(
        `http://localhost:8080/api/v1/characters/${charId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      console.log("Character deleted:", deleteChar);

      dispatch({ type: "CHAR_DELETE", payload: charId });

      onReload();
    } catch (error) {
      console.error("Error deleting character:", error);
    }
  };

  return <button onClick={handleDelete}>Delete character</button>;
};

export default DeleteCharacter;
