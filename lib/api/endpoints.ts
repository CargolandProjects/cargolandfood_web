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
  user: (id: string) => `/users/${id}`,

  vendor: {
    allVendors: "/users/vendors",
    vendorById: (id: string) => `/users/menus/${id}`,
  },

  cart: {
    useCart: (vendorId: string) => `/orders/cart-item/${vendorId}`,
    addOrUpdateItem: (vendorId: string) => `/orders/cart-item/${vendorId}`,
    clearCart: (cartId: string) => `/orders/clear-cart/${cartId}`,
    checkoutPreview: (vendorId: string) =>
      `/orders/checkout-preview/${vendorId}`,
  },

  order: {
    checkoutPreview: (vendorId: string) =>
      `/orders/checkout-preview/${vendorId}`,
    placeOrder: (vendorId: string) => `/orders/placeOrder/${vendorId}`,
  },

  address: {
    getAddresses: "/users/addresses",
    createAddress: "/users/create-address",
    deleteAddress: (addressId: string) =>
      `/api/v1/users/delete-address/${addressId}`,
  },
};
