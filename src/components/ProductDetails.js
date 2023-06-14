export const ProductDetails = ({ product }) => {
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
      <p>{product.createdAt}</p>
    </div>
  );
};
