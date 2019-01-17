import { createStore } from "redux";
import rootReducer from "../reducers";
// import checkReducer from "../reducers/checkReducer";
const store = createStore(rootReducer);

export default store;
