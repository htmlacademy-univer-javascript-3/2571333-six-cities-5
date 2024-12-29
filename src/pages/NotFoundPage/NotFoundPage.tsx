import { Link } from 'react-router-dom';
import { AppRoute } from '../../recources/Routes.ts';
import PageHeader from '../../components/PageHeader/PageHeader.tsx';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { ActionTypes } from '../../recources/ActionTypes.ts';

function NotFoundPage(): JSX.Element {
  const userData = useAppSelector((state) => state[ActionTypes.USER].userData);
  const isAuthorized = useAppSelector((state) => state[ActionTypes.USER].authorizationStatus);

  return (
    <div className="page page--gray page--notfound">
      <PageHeader isAuthorized={isAuthorized} userData={userData} />
      <div>
        <h1>404 Not Found</h1>
        <p>This page does not (yet) exist</p>
        <button>
          <Link to={AppRoute.Main}>Try going there</Link>
        </button>

      </div>
    </div>
  );
}


export default NotFoundPage;
