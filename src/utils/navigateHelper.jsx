let globalNavigate = null;

export const setGlobalNavigate = (navigateFn) => {
  globalNavigate = navigateFn;
};

export const getNavigate = () => {
  return globalNavigate;
};
