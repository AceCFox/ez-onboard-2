const tokenTimeout = (state = false, action) => {
    switch (action.type) {
      case 'TOKEN_EXPIRED':
        return true;
      case 'TOKEN_UNEXPIRED':
        return false;
      default:
        return state;
    }
  };


  // timeout boolean will be on the redux state at:
  // state.timeout
  export default tokenTimeout;
