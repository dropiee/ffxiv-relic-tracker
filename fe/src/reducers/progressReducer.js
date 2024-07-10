const initialState = {
  progress: localStorage.getItem("progress")
    ? JSON.parse(localStorage.getItem("progress"))
    : [],
};

const progressReducer = (state, action) => {
  switch (action.type) {
    case "PROGRESS_LIST":
      return { progress: action.payload };
    case "PROGRESS_UPDATE":
      return {
        progress: state.progress.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          } else return item;
        }),
      };
    default:
      return state;
  }
};

export { initialState, progressReducer };
