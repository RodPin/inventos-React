function checkReducer(state = [], action = {}) {
  switch (action.type) {
    case "FOTO":
      state = { foto: action.foto, form: action.form };
  }
  return state;
}
export default checkReducer;
