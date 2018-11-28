
import { combineReducers  } from "redux";
import {  userReducer } from "./user.reducer";
import { invoicesReducer } from "./invoices.reducer";

export const allReducers = combineReducers({
    invoices: invoicesReducer,
    user: userReducer
});
