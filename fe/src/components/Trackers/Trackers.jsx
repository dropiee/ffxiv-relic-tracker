import { useEffect, useReducer, useContext, useState } from "react";
import axios from "axios";
import TrackerCard from "./TrackerCard.jsx";
import MyContext from "../../MyContext.js";
import { trackerReducer, initialState } from "../../reducers/trackerReducer.js";

const Trackers = () => {
  const [state, dispatch] = useReducer(trackerReducer, initialState);
  const { activeChar, reload, setReload } = useContext(MyContext);
  const handleReload = () => {
    setReload((prev) => !prev);
  };

  const trackersList = state.trackers.map((tracker) => {
    return (
      <TrackerCard
        key={tracker._id}
        trackerId={tracker._id}
        trackerSeries={tracker.trackerSeries}
        trackerJob={tracker.trackerJob}
        steps={tracker.steps}
        onReload={handleReload}
      />
    );
  });

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await axios.get(
        `https://ffxiv-relic-tracker-api.vercel.app/api/v1/trackers/by_character/${activeChar.charId}`
      );

      localStorage.setItem("trackers", JSON.stringify(data));
      dispatch({ type: "TRACKER_LIST", payload: data });
    })();
  }, [state.trackers.length, reload]);

  return <div className="ml-60 mr-5">{trackersList}</div>;
};

export default Trackers;
