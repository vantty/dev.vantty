import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
  INITIAL_SERVICES,
  ADD_BOOK,
  CLEAR_BOOK
} from "../actions/types";

const initState = {
  items: [],
  addedItems: [],
  total: 0,
  loading: true
};

const cartReducer = (state = initState, action) => {
  //INITIAL SERVICES
  if (action.type === INITIAL_SERVICES) {
    return {
      ...state,
      items: action.services
    };
  }

  //INSIDE HOME COMPONENT
  if (action.type === ADD_TO_CART) {
    let addedItem = state.items.find(item => item._id === action.id);
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find(item => action.id === item.id);
    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + addedItem.amount
      };
    } else {
      addedItem.quantity = 1;
      //calculating the total
      let newTotal = state.total + addedItem.amount;

      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find(item => action.id === item.id);
    let new_items = state.addedItems.filter(item => action.id !== item.id);

    //calculating the total
    let newTotal = state.total - itemToRemove.amount * itemToRemove.quantity;
    console.log(itemToRemove);
    return {
      ...state,
      addedItems: new_items,
      total: newTotal
    };
  }
  //INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.items.find(item => item._id === action.id);

    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.amount;
    return {
      ...state,
      total: newTotal
    };
  }

  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find(item => item._id === action.id);

    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter(item => item._id !== action.id);
      let newTotal = state.total - addedItem.amount;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.amount;
      return {
        ...state,
        total: newTotal
      };
    }
  }

  if (action.type === ADD_SHIPPING) {
    return {
      ...state,
      total: state.total + 6
    };
  }

  // if (action.type === "SUB_SHIPPING") {
  //   return {
  //     ...state,
  //     total: state.total - 6
  //   };
  // } else {
  //   return state;
  // }

  if (action.type === ADD_BOOK) {
    return {
      ...state,
      loading: state.payload
    };
  } else {
    return state;
  }

  if (action.type === CLEAR_BOOK) {
    return {
      items: [],
      addedItems: [],
      total: 0,
      loading: true
    };
  } else {
    return state;
  }
};

export default cartReducer;
