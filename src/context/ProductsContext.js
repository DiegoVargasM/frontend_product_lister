import { createContext, useReducer } from "react";

export const ProductsContext = createContext();

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        products: action.payload,
      };
    case "CREATE_PRODUCT":
      return {
        products: [action.payload, ...state.products],
      };
    case "DELETE_PRODUCT":
      return {
        products: state.products.filter((p) => p._id !== action.payload._id),
      };
    case "EDIT_PRODUCT":
      const updatedProducts = state.products.map((product) => {
        if (product._id === action.payload._id) {
          return {
            ...product,
            ...action.payload.updatedData,
          };
        }
        return product;
      });

      return {
        products: updatedProducts,
      };
    default:
      return state;
  }
};

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: null,
  });

  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
