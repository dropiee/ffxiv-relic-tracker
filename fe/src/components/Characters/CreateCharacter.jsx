import { useState, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../MyContext";
import axios from "axios";
import {
  characterReducer,
  initialState,
} from "../../reducers/characterReducer";
import { Link } from "react-router-dom";
import Header from "../Header";

const CreateCharacter = () => {
  const {
    user: { accessToken },
  } = useContext(MyContext);
  const [state, dispatch] = useReducer(characterReducer, initialState);
  const [name, setName] = useState("");
  const [world, setWorld] = useState("Aegis");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { data },
    } = await axios.post(
      "https://ffxiv-relic-tracker-api.vercel.app/api/v1/characters",
      { charName: name, charWorld: world },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const newProgress = await axios.post(
      "https://ffxiv-relic-tracker-api.vercel.app/api/v1/progress",
      { charId: data._id },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    dispatch({ type: "CHAR_ADD", payload: data });
    dispatch({
      type: "PROGRESS_ADD",
      payload: newProgress.data.data.map(
        (progress) => progress.insertOne.document
      ),
    });
    navigate("/welcome");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col">
        <div className="charCreate">
          <div className="circle" />
          <form onSubmit={handleSubmit} className="form">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Home World</label>
            <select
              onChange={(e) => {
                setWorld(e.target.value);
              }}
              className="select"
            >
              <option value="Aegis">Aegis</option>
              <option value="Atomos">Atomos</option>
              <option value="Carbuncle">Carbuncle</option>
              <option value="Garuda">Garuda</option>
              <option value="Gungnir">Gungnir</option>
              <option value="Kujata">Kujata</option>
              <option value="Tonberry">Tonberry</option>
              <option value="Typhon">Typhon</option>
            </select>
            <button type="submit" className="button">
              Create character
            </button>
          </form>
        </div>
        <div className="mx-auto mt-8">
          <Link to="/welcome" className="button">
            Cancel character creation
          </Link>
        </div>
      </div>
    </>
  );
};

export default CreateCharacter;
