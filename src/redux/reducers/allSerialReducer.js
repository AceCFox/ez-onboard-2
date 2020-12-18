const allSerialReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_SERIAL':
        return action.payload;
      case 'UNSET_ALL_SERIAL':
        return [];
      default:
        return state;
    }
  };
  
  // array of all serial numbers will be on the redux state at:
  // state.serial
  export default allSerialReducer;