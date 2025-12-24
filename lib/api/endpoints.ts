export const API_ROUTES = {
  promotions: "/promotions",
  restaurants: "/restaurants",
  categories: "/categories",
  restaurant: (id: string) => `/restaurants/${id}`,
  search: (query: string) => `/users/search-vendor-menus?query=${query}`,

  auth: {
    signUp: "/users",
    login: "/users/login",
    verifyOtp: "/users/verify-phone-otp",
    resendOtp: "/users/resend-phone-otp",
    refresh: "/users/refresh-token",
  },
  user: (id: string) => `/users/${id}`,
};
