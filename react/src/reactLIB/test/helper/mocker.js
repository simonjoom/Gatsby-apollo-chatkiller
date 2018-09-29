export default (name, mock) => {
  const actual = M.fn[name];
  M.fn[name] = mock;

  return () => {
    M.fn[name] = actual;
  };
};
