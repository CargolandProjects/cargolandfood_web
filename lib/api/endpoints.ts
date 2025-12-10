export const API_ROUTES = {
  promotions: "/promotions",
  restaurants: "/restaurants",
  categories: "/categories",
  search: (query: string) => `/users/search-vendor-menus?query=${query}`,
};
