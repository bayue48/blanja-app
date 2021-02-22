import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

const RoutePrivate = ({ component: Component, auth, ...rest }) => {
    const level = useSelector((state) => state.auth.level);
    return (
      <Route
        {...rest}
        render={(props) =>
          level === 1 ? <Redirect to="/" /> : <Component {...props} />
        }
      />
    );
  };
  
  const mapStateToProps = ({ auth }) => {
    return {
      auth,
    };
  };
  
  export default connect(mapStateToProps)(RoutePrivate);