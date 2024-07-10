import { useReducer, useContext, useState } from "react";
import axios from "axios";
import MyContext from "../../MyContext.js";
import { trackerReducer, initialState } from "../../reducers/trackerReducer.js";

const CreateTracker = () => {
  const [state, dispatch] = useReducer(trackerReducer, initialState);
  const {
    user: { accessToken },
    activeChar,
    setReload,
  } = useContext(MyContext);
  const [series, setSeries] = useState("Zodiac");
  const [job, setJob] = useState("Paladin");
  const handleReload = () => {
    setReload((prev) => !prev);
  };

  const createTracker = async (e) => {
    e.preventDefault();

    const {
      data: { data },
    } = await axios.post(
      "http://localhost:8080/api/v1/trackers/",
      { charId: activeChar.charId, trackerSeries: series, trackerJob: job },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    dispatch({ type: "TRACKER_ADD", payload: data });
    handleReload();
  };

  return (
    <form onSubmit={(e) => createTracker(e)} className="form">
      <select
        onChange={(e) => {
          setSeries(e.target.value);
        }}
      >
        <option value="Zodiac">Zodiac</option>
      </select>
      <select
        onChange={(e) => {
          setJob(e.target.value);
        }}
      >
        <option value="Paladin">Paladin</option>
        <option value="Warrior">Warrior</option>
        <option value="Dragoon">Dragoon</option>
        <option value="Monk">Monk</option>
        <option value="Ninja">Ninja</option>
        <option value="Bard">Bard</option>
        <option value="Black Mage">Black Mage</option>
        <option value="Summoner">Summoner</option>
        <option value="Scholar">Scholar</option>
        <option value="White Mage">White Mage</option>
      </select>
      <button type="submit" className="button">
        Create tracker
      </button>
    </form>
  );
};

export default CreateTracker;
