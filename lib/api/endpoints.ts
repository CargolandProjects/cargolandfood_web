export const API_ROUTES = {
  promotions: "/promotions",
  restaurants: "/restaurants",
  categories: "/categories",
  search: (query: string) => `/users/search-vendor-menus?query=${query}`,

  auth: {
    signUp: "/users",
    login: "/users/login",
    verifyOtp: "/users/verify-phone-otp",
    resendOtp: "/users/resend-phone-otp",
  },
};
