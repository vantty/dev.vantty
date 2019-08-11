import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test="${attr}"]`);
  return wrapper;
};

const middleware = [thunk];
export const testStore = initalState => {
  return createStore(
    rootReducer,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};
