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
    if (product.amount < 0) {
      setError("Amount debe ser mayor a 0");
      return;
    }
    // la constante response es un objeto del tipo response:
    // contiene informacion sobre la respuesta HTTP
    // acceso a metodos como response.ok, .status, .headers, .json()
    const response = await fetch("/api/products", {
      method: "POST",
      // no podemos enviar un objeto, por eso lo convertimos a JSON string
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    // creamos una variable json para guardar la respuesta
    const json = await response.json();
    console.log("RESPONSE de creacion", response);
    console.log("json de creacion", json);

    if (!response.ok) {
      // en el controlador creamos la propiedad error
      setError(json.error);
      // validacion de campos vacios
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setProductName("");
      setCategory("");
      setAmount("");
      setAditionalInfo("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_PRODUCT", payload: json.product });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Expense</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setProductName(e.target.value)}
        value={product_name}
        className={emptyFields.includes("Title") ? "error" : ""}
      />

      <label>Category:</label>
      <input
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className={emptyFields.includes("Category") ? "error" : ""}
      />

      <label>Amount:</label>
      <input
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        className={emptyFields.includes("Amount") ? "error" : ""}
      />

      <label>Aditional Info:</label>
      <textarea
        type="text"
        onChange={(e) => setAditionalInfo(e.target.value)}
        value={aditional_info}
      />

      <button>Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;
