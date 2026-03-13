export const API_ROUTES = {
  promotions: "/promotions",

  restaurants: "/restaurants",
  categories: "/categories",
  hotPicks: "/hotPicks",
  restaurant: (id: string) => `/restaurants/${id}`,
  searchVendorMenu: (zoneId: string, query: string) =>
    `/users/search-vendor-menus/${zoneId}?query=${query}`,

  auth: {
    signUp: "/users",
    login: "/users/login",
    verifyOtp: "/users/verify-phone-otp",
    resendOtp: "/users/resend-phone-otp",
    refresh: "/users/refresh-token",
  },

  user: {
    user: (id: string) => `/users/${id}`,
    updatePersonalInfo: "/users/personal-info",
  },

  vendor: {
    allVendors: (zoneId: string) => `/users/vendors/${zoneId}`,
    vendorById: (id: string) => `/users/menus/${id}`,
    getVendorsByCategory: (zoneId: string) =>
      `/users/vendor-by-category/${zoneId}`,
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
    chargeWallet: "/users/charge-user-wallet",
    simulatePayment: (checkoutSessionId: string) =>
      `/orders/payment-simulation/${checkoutSessionId}`,
    getOrders: "/orders/get-all-user-orders",
    orderDetails: (orderId: string) => `/orders/order/${orderId}`,
    getOrderByReference: (reference: string) =>
      `/orders/order-by-reference/${reference}`,
    trackOrder: (orderId: string) => `/users/track-order/${orderId}`,
  },

  address: {
    getAddresses: "/users/addresses",
    createAddress: "/users/create-address",
    setGuestAddress: "/users/set-guest-user-address",
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

  wallet: {
    fundWallet: "/users/fund-user-wallet",
    walletBalance: "/users/user-wallet/balance",
    transactionRecords: "/users/user-wallet-transaction/records",
  },
};
