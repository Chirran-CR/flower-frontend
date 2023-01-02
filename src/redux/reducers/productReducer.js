import { FETCH_PRODUCTS_SUCCESS } from "../actions/productActions";
import { fetchProducts } from "../actions/productActions";
const initState = {
  products: []
};

const productReducer = (state = initState, action) => {
  if (action.type === FETCH_PRODUCTS_SUCCESS) {
    return {
      ...state,
      products: action.payload
    };
  }
  if (action.type=="set-from-searched-product"){
    fetchProducts(action.payload);
     return {...action.payload}
  }
  return state;
};

export default productReducer;
