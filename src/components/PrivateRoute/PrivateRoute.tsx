import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../recources/Routes';

type PrivateRouteProps = {
    isAuthorized: boolean;
    children: JSX.Element;
};

function PrivateRoute({ isAuthorized, children }: PrivateRouteProps): JSX.Element {
  return isAuthorized ? children : <Navigate to={AppRoute.Main} />;
}

export default PrivateRoute;
