import { useState, useEffect } from "react";

//components
import { ProductDetails } from "../components/ProductDetails";
import { ProductForm } from "../components/ProductForm";

export const Home = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="home">
      <div className="products">
        {products &&
          products.map((product) => (
            <ProductDetails key={product._id} product={product} />
          ))}
      </div>
      <ProductForm />
    </div>
  );
};
