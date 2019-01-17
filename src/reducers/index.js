import { combineReducers } from "redux";
import checkReducer from "./checkReducer";
import tableReducer from "./tableReducer";
//combine reducer for multiple reducers]
//Dont forget to Put <App> inside a Provider at App.js

//combinar mais de 1 reducer
//Nao esqueca de colocar o <App> dentro do Provider no App.js

const rootReducer = combineReducers({
  checkState: checkReducer,
  statusState: tableReducer
});

export default rootReducer;
