const initialState = {
  characters: localStorage.getItem("characters")
    ? JSON.parse(localStorage.getItem("characters"))
    : [],
};

const characterReducer = (state, action) => {
  switch (action.type) {
    case "CHAR_LIST":
      return { characters: action.payload };
    case "CHAR_ADD":
      return { characters: [action.payload, ...state.characters] };
    case "CHAR_DELETE":
      return {
        characters: state.characters.filter(
          (item) => item._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export { initialState, characterReducer };
