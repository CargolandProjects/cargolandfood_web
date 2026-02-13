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
    allVendors: (userAddressId: string) => `/users/vendors/${userAddressId}`,
    vendorById: (id: string) => `/users/menus/${id}`,
  },

  cart: {
    getCart: "/orders/user-carts",
    addOrUpdateItem: (vendorId: string) => `/orders/cart-item/${vendorId}`,
    clearCart: (cartId: string) => `/orders/clear-cart/${cartId}`,
    checkoutPreview: (vendorId: string) =>
      `/orders/checkout-preview/${vendorId}`,
    removeCartItem: (cartId: string, cartItemId: string) =>
      `/orders/cart-item/${cartId}/${cartItemId}`,
  },

  order: {
    checkoutPreview: (vendorId: string) =>
      `/orders/checkout-preview/${vendorId}`,
    makePayment: (cartId: string) => `/orders/make-payment/${cartId}`,
    simulatePayment: (checkoutSessionId: string) =>
      `/orders/payment-simulation/${checkoutSessionId}`,
  },

  address: {
    getAddresses: "/users/addresses",
    createAddress: "/users/create-address",
    selectAddress: (addressId: string) => `/users/select-address/${addressId}`,
    deleteAddress: (addressId: string) => `/users/delete-address/${addressId}`,
  },

  reviews: {
    getReviews: "/users/menu-reviews-by-user",
    submitReview: "/users/submit-menu-review",
  },

  favourites: {
    getFavourites: (userId: string) => `/users/favourite-vendor/${userId}`,
    makeFavourite: "/users/favourite-vendor",
  },
};
