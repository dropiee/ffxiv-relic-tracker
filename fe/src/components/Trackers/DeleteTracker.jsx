import axios from "axios";
import { useContext, useReducer } from "react";
import MyContext from "../../MyContext";
import { initialState, trackerReducer } from "../../reducers/trackerReducer.js";

const DeleteTracker = ({ trackerId, onReload }) => {
  const {
    user: { accessToken },
  } = useContext(MyContext);
  const [state, dispatch] = useReducer(trackerReducer, initialState);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const deleteTracker = await axios.delete(
        `http://localhost:8080/api/v1/trackers/${trackerId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      console.log("Tracker deletion successful");

      dispatch({ type: "TRACKER_DELETE", payload: trackerId });

      onReload();
    } catch (error) {
      console.error("Error deleting tracker:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="deleteBtn">
      Delete tracker
    </button>
  );
};

export default DeleteTracker;
