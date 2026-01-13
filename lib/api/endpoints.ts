export const API_ROUTES = {
  promotions: "/promotions",

  restaurants: "/restaurants",
  categories: "/categories",
  hotPicks: "/hotPicks",
  restaurant: (id: string) => `/restaurants/${id}`,
  search: (query: string) => `/users/search-vendor-menus?query=${query}`,

  auth: {
    signUp: "/users",
    login: "/users/login",
    verifyOtp: "/users/verify-phone-otp",
    resendOtp: "/users/resend-phone-otp",
    refresh: "/users/refresh-token",
  },

  vendor: {
    allVendors: "/users/vendors",
    vendorById: (id: string) => `/users/menus/${id}`,
  },

  user: (id: string) => `/users/${id}`,
};
