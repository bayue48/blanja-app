const authReducer = (prevState = { isLogin: false }, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...prevState,
          isLogin: true
        }
      case "LOGOUT":
        return {
          ...prevState,
          isLogin: false
        }
        default:
          return {
            ...prevState,
          }
  
    }
  }
  
  export default authReducer