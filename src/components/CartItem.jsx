import Button from "./Button";

export default function CartItem({
  cartProduct,
  onIncrease,
  onDecrease,
  onRemoveItem,
}) {
  function hanldePlus() {
    onIncrease(cartProduct.id);
  }
  function hanldeMinus() {
    onDecrease(cartProduct.id);
  }
  function handleRemove() {
    onRemoveItem(cartProduct.id);
  }

  return (
    <div className="cart-item">
      <img
        alt={cartProduct.title}
        className="cart-item-image"
        src={cartProduct.img}
      />
      <div className="cart-item-details">
        <h3 className="cart-item-title">{cartProduct.title}</h3>
        <p className="cart-item-price">${cartProduct.price}</p>
        <div className="cart-item-actions">
          <div className="quantity-controls">
            <Button
              className="quantity-button"
              onClick={hanldeMinus}
              disabled={cartProduct.quantity === 1}
            >
              −
            </Button>
            <span className="quantity-value">{cartProduct.quantity}</span>
            <Button className="quantity-button" onClick={hanldePlus}>
              +
            </Button>
          </div>
          <Button className="remove-button" onClick={handleRemove}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
