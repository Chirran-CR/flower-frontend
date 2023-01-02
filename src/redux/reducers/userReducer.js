import uuid from "uuid/v4";


const initState = {};

const userReducer = (state = initState, action) => {
//   const user = state,
//     product = action.payload;

  if (action.type === "set-user") {
   return {user:action.payload};
  }

  if (action.type === "remove-user") {
   return {}
  }

  return state;
};

export default userReducer;
