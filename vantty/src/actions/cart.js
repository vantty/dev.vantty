import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  INITIAL_SERVICES,
  CLEAR_CART
} from "./types";

//add cart action
export const initialServices = services => {
  return {
    type: INITIAL_SERVICES,
    services
  };
};

//add cart action
export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    id
  };
};
//remove item action
export const removeItem = id => {
  return {
    type: REMOVE_ITEM,
    id
  };
};
//subtract qt action
export const subtractQuantity = id => {
  return {
    type: SUB_QUANTITY,
    id
  };
};
//add qt action
export const addQuantity = id => {
  return {
    type: ADD_QUANTITY,
    id
  };
};

// /add qt action
export const clearCart = id => {
  return {
    type: CLEAR_CART
  };
};
