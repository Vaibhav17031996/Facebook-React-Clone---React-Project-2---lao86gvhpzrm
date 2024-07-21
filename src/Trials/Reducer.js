export const initialState = {
  //   user: null,
  user: "Vaibhav",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
export default reducer;

/* 
    Why do we need reducer? => so that in future we can do modifications like LogOut, setting the user data etc.

    Reducer is a function that determines how the state of an application changes in response to an action. They are typically used in state management patterns like Redux, and also in React's useReducer hook. 
    A reducer is a pure function that takes the current state and an action, then returns a new state. 

    The useReducer hook is a built-in hook in React that provides a way to manage complex state logic in a functional component. It is an alternative to useState, and it is particularly useful when the state logic involves multiple sub-values or when the next state depends on the previous state.
    The useReducer hook uses a reducer function and an initial state. It returns the current state and a dispatch function to trigger state changes.    
*/
