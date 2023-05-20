import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import useAuthenticated from './useAuthenticated';

interface IProtectedRouteProps extends RouteProps {
  authenticationPath: string;
}
const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  authenticationPath,
  ...props
}) => {
  const isAuthenticated = useAuthenticated();

  if (!isAuthenticated) {
    const renderComponent = () => <Redirect to={{ pathname: authenticationPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
