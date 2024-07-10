import { useEffect, useReducer, useContext } from "react";
import axios from "axios";
import ProgressByJob from "./ProgressByJob.jsx";
import MyContext from "../../MyContext.js";
import {
  progressReducer,
  initialState,
} from "../../reducers/progressReducer.js";

const Progress = () => {
  const [state, dispatch] = useReducer(progressReducer, initialState);
  const { activeChar } = useContext(MyContext);

  const progressList = state.progress.map((progress) => {
    return (
      <ProgressByJob
        key={progress._id}
        progressId={progress._id}
        relicJob={progress.relicJob}
        relicSeries={progress.relicSeries}
        relicProgress={progress.relicProgress}
      />
    );
  });

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await axios.get(
        `https://ffxiv-relic-tracker-api.vercel.app/api/v1/progress/by_character/${activeChar.charId}`
      );
      localStorage.setItem("progress", JSON.stringify(data));
      dispatch({ type: "PROGRESS_LIST", payload: data });
    })();
  }, [state.progress.length]);

  return (
    <>
      <h1 className="ml-60 pb-3 text-3xl font-bold">Zodiac</h1>
      <div className="ml-60 flex flex-wrap">{progressList}</div>
    </>
  );
};

export default Progress;
