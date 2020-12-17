import { combineReducers } from "redux";
import authReducer from './auth'
import myBagReducer from './cart'

const reducers = combineReducers({
  auth: authReducer,
  myBag: myBagReducer
});

export default reducers;