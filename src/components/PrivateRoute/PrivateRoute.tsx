import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../recources/Routes';

type PrivateRouteProps = {
    isAuthorized: boolean;
    hasToBeAuthorized: boolean;
    children: JSX.Element;
};

function PrivateRoute({ isAuthorized, hasToBeAuthorized, children }: PrivateRouteProps): JSX.Element {
  let result;
  if (hasToBeAuthorized) {
    result = isAuthorized ? children : <Navigate to={AppRoute.Login} />;
  } else {
    result = !isAuthorized ? children : <Navigate to={AppRoute.Main} />;
  }
  return result;
}

export default PrivateRoute;
