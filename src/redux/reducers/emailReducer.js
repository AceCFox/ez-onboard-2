const emailReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_EMAIL':
        return action.payload[0].exists;
      case 'UNSET_EMAIL':
        return '';
      default:
        return state;
    }
  };
  
  // site will be on the redux state at:
  // state.email
  export default emailReducer;