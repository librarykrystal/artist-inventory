const itemIdReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ITEM_ID':
        return action.payload;
    //   case 'CLEAR_ITEM_ID':
    //     return {};
      default:
        return state;
    }
  };
  
  export default itemIdReducer;