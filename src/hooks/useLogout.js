import { useAuthContext } from "./useAuthContext";
import { useProductsContext } from "./useProductsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: productsDispatch } = useProductsContext();

  const logout = () => {
    // remove user from local storage
    localStorage.removeItem("user");

    // remove user from auth context
    dispatch({ type: "LOGOUT" });

    // remove products from products context
    productsDispatch({ type: "SET_PRODUCTS", payload: null });
  };
  return { logout };
};
