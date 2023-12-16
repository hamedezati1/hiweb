import { createStore } from "redux";

import rootReducer from "./reducer/productReducer";

const store = createStore(rootReducer);

export default store;
