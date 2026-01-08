import Button from "./Button";
import Stars from "./Stars";

export default function Product({ product, onAddToCart }) {
  function handleAdd() {
    const newProduct = {
      id: product.id,
      img: product.image,
      title: product.title,
      price: product.price,
      quantity: 1,
    };

    onAddToCart(newProduct);
  }
  return (
    <li className="product-card">
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image}
          alt={product.title}
        />
        <span className="product-price-badge">${product.price}</span>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <span className="rating-stars">
            <Stars filled={Math.round(product.rating.rate)} />
          </span>
          <span className="rating-count">({product.rating.count})</span>
        </div>
        <Button className="add-to-cart-button" onClick={handleAdd}>
          Add to Cart
        </Button>
      </div>
    </li>
  );
}
