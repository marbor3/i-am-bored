import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

StateProvider.propTypes = {
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
};

StateProvider.defaultProps = {
  initialState: {},
};

export const useDashboardContext = () => useContext(StateContext);
export const useDashboardState = () => {
  const context = useContext(StateContext);

  return context[0];
};
export const useDashboardDispatch = () => {
  const context = useContext(StateContext);

  return context[1];
};
