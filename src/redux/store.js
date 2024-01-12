import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducer";
const store = configureStore({
  reducer: rootReducers,
});
console.log(store);

export default store;
