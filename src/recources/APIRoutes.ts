export const APIRoutes = {
  OFFERS: {
    ALL: '/offers',
    EXACT: '/offers/{offerId}',
    NEARBY: '/offers/{offerId}/nearby',
  },
  FAVORITE: {
    GET: '/favorite',
    SET_STATUS: '/favorite/{offerId}/{status}',
  },
  COMMENTS: {
    GET: '/comments/{offerId}',
    POST: '/comments/{offerId}',
  },
  USER: {
    VALIDATE: '/login',
    LOGIN: '/login',
    LOGOUT: '/logout',
  },
};
