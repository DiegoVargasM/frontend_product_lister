import { useProductsContext } from "../hooks/useProductsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`/api/products/${product._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  };

  return (
    <div className="product-details">
      <h4>{product.product_name}</h4>
      <p>
        <strong>Category: </strong>
        {product.category}
      </p>
      <p>
        <strong>Amount: </strong>
        {product.amount}
      </p>
      <p>
        <strong>Aditional Info: </strong>
        {product.aditional_info}
      </p>
      <p>
        {formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};

export default ProductDetails;
