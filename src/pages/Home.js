import { useEffect } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import ProductDetails from "../components/ProductDetails";
import ProductForm from "../components/ProductForm";

const Home = () => {
  const { products, dispatch } = useProductsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProducts = async () => {
      // no es necesario poner la url completa
      // "http://localhost:8000/api/products" porque agregamos el proxy en package.json
      // ojo: solo funciona en desarrollo, en produccion se debe usar la url completa
      const response = await fetch("/api/products", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };
    // if user is logged in, fetch products
    if (user) {
      fetchProducts();
    }
  }, [dispatch, user]);

  let balance = 0;

  if (products) {
    for (const product of products) {
      balance += product.amount;
    }
  }

  const balanceStyle = {
    color: balance < 0 ? "red" : "green",
  };

  return (
    <div className="home">
      <div className="products">
        <div>
          Total expenses:<span style={balanceStyle}> S/.{balance}</span>
        </div>
        {products?.map((product) => (
          <ProductDetails product={product} key={product._id} />
        ))}
      </div>
      <ProductForm />
    </div>
  );
};

export default Home;
