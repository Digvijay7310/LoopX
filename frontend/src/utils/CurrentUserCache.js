// Simple in-memory cache (resets on page reload)
let cachedUser = null;

export const getCachedUser = () => cachedUser;
export const setCachedUser = (user) => {
  cachedUser = user;
};
