import { useState, useEffect } from "react";

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
            <p key={product._id}>{product.product_name}</p>
          ))}
      </div>
    </div>
  );
};
