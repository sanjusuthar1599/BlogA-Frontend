import { combineReducers } from '@reduxjs/toolkit';
import blogReducer from "./reducer/blogreducer";

 
const rootReducer = combineReducers({
    blogReducer,
    });

export default rootReducer;