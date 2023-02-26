const itemReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ITEM':
        return action.payload;
      case 'CLEAR_ITEM':
        return {};
      default:
        return state;
    }
  };
  
  export default itemReducer;