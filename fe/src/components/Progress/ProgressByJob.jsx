import axios from "axios";
import MyContext from "../../MyContext";
import { useContext, useReducer } from "react";
import { initialState, progressReducer } from "../../reducers/progressReducer";

const ProgressByJob = ({ progressId, relicJob, relicProgress }) => {
  const [state, dispatch] = useReducer(progressReducer, initialState);
  const {
    user: { accessToken },
  } = useContext(MyContext);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const {
      data: { data },
    } = await axios.patch(
      `http://localhost:8080/api/v1/progress/${progressId}/update`,
      { relicProgress: e.target.value },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const current = JSON.parse(localStorage.getItem("progress")).map((item) => {
      if (item._id === progressId) {
        return data;
      }
      return item;
    });

    localStorage.setItem("progress", JSON.stringify(current));
    dispatch({ type: "PROGRESS_UPDATE", payload: data });
  };

  return (
    <div className="progressJob">
      <h2>{relicJob}</h2>
      <select defaultValue={relicProgress} onChange={(e) => handleUpdate(e)}>
        {Array(9)
          .fill(0)
          .map((x, y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ProgressByJob;
