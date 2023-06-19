import { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ProductForm = () => {
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();

  const [product_name, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [aditional_info, setAditionalInfo] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to add a product");
      return;
    }

    const product = { product_name, category, amount, aditional_info };

    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    console.log("json de creacion", json);

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setProductName("");
      setCategory("");
      setAmount("");
      setAditionalInfo("");
      setError(null);
      setEmptyFields([]);
      console.log("new product added", json);
      dispatch({ type: "CREATE_PRODUCT", payload: json.product });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Product</h3>

      <label>Product Name:</label>
      <input
        type="text"
        onChange={(e) => setProductName(e.target.value)}
        value={product_name}
        className={emptyFields.includes("product_name") ? "error" : ""}
      />

      <label>Category:</label>
      <input
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className={emptyFields.includes("category") ? "error" : ""}
      />

      <label>Amount:</label>
      <input
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        className={emptyFields.includes("amount") ? "error" : ""}
      />

      <label>Aditional Info:</label>
      <textarea
        type="text"
        onChange={(e) => setAditionalInfo(e.target.value)}
        value={aditional_info}
      />

      <button>Add Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;
