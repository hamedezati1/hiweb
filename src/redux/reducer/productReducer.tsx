import ReducerTypes from "../types/ReducerTypes";

const INITIAL_STATE = {
  productList: null,
};

function productReducer(
  state = INITIAL_STATE,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case ReducerTypes.PRODUCT_LIST:
      return { ...state, productList: action.payload };
    default:
      return state;
  }
}

export default productReducer;
