function tableReducer(state = false, action = {}) {
  switch (action.type) {
    case "RENDER_TABLE":
      state = action.status;
  }
  return state;
}
export default tableReducer;
