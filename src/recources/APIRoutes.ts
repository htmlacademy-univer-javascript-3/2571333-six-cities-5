export const APIRoutes = {
  OFFERS: {
    ALL: '/offers',
    EXACT: (offerId: string) => `/offers/${offerId}`,
    NEARBY: (offerId: string) => `/offers/${offerId}/nearby`,
  },
  FAVORITE: {
    GET: '/favorite',
    SET_STATUS: '/favorite/{offerId}/{status}',
  },
  COMMENTS: {
    GET: (offerId: string) => `/comments/${offerId}`,
    POST: (offerId: string) => `/comments/${offerId}`,
  },
  USER: {
    VALIDATE: '/login',
    LOGIN: '/login',
    LOGOUT: '/logout',
  },
};
