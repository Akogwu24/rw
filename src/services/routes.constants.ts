export const API_ENDPOITS = {
  //profile
  GET_USER: '/users/me',
  UPDATE_USER: (userId: string) => `/users/${userId}`,
  UPLOAD_PROFILE_PHOTO: '/users/profile-photo',
  CREATE_EMERGENCY_CONTACT: (userId: string) => `/users/${userId}/contact`,
  EDIT_EMAERGENCY_CONTACT: (contactId: string) => `/users/contact/${contactId}`,

  USER_CHANGE_PASSWORD: '/users/change-password',

  USER_ALERT_CONATACTS: '/users/emergency/notify',
  //news
  GET_TODAY_NEWS: (page: number | string) => `/news?page=${page}&per_page=4`,
  GET_TODAY_NEWS_CATEGORY: (catrgory: string, page: number | string) => `/news/category/${catrgory}/?page=${page}&per_page=4`,

  //incidents
  CREATE_DETAILED_INCIDENT_REPORT: '/incidents',
  GET_INCIDENTS: ({ long, lat, radius = 500 }: { long: string | number; lat: string | number; radius: string | number }) =>
    `/incidents?incidentByLocationRange=${long},${lat},${radius}`,
  GET_INCIDENTS_BY_CATEGORY: (category: string) => `/incidents?incidentsByNature=${category}`,

  //auth
  LOGIN_WITH_GOOGLE: '/auth/login/oauth-google',
  LOGIN_WITH_APPLE: '/auth/login/oauth-apple',
  RESEND_VERIFICATION_LINK: (email: string) => `/auth/resend/${email}/verification`,

  //dsva
  REPORT_INCIDENT: '/reports',
};
