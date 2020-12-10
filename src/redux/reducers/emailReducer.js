const emailReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_EMAIL':
        return action.payload;
      case 'UNSET_EMAIL':
        return '';
      default:
        return state;
    }
  };


  // email will be on the redux state at:
  // state.email
  export default emailReducer;

    

  