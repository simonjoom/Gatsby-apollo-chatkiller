
import pathToRegexp from "path-to-regexp";
export const getIdfromRegexPath = (pathname, matchPath) => {
  const regexp = pathToRegexp(matchPath, []);
  const res = pathname.match(regexp);
  return res[1];
};
