const initialState = {
  trackers: localStorage.getItem("trackers")
    ? JSON.parse(localStorage.getItem("trackers"))
    : [],
};

const trackerReducer = (state, action) => {
  switch (action.type) {
    case "TRACKER_LIST":
      return { trackers: action.payload };
    case "TRACKER_ADD":
      return { trackers: [action.payload, ...state.trackers] };
    case "TRACKER_DELETE":
      return {
        trackers: state.trackers.filter(
          (tracker) => tracker._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export { initialState, trackerReducer };
