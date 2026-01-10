import Button from "./Button";
import CartItem from "./CartItem";

export default function Cart({
  cartProducts,
  setIsCartOpen,
  onRemoveItem,
  onIncrease,
  onDecrease,
}) {
  const totalPrice = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <Button
            className="cart-close-button"
            onClick={() => setIsCartOpen(false)}
          >
            ×
          </Button>
        </div>
        <div className="cart-items-container">
          {cartProducts.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p className="cart-empty-text">Your cart is empty</p>
            </div>
          ) : (
            <div className="cart-items">
              {cartProducts.map((cartProduct) => (
                <CartItem
                  cartProduct={cartProduct}
                  key={cartProduct.id}
                  onRemoveItem={onRemoveItem}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                />
              ))}
            </div>
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span className="total-label">Total:</span>
            <span className="total-amount">${totalPrice.toFixed(2)}</span>
          </div>
          <Button className="checkout-button">Checkout</Button>
        </div>
      </div>
    </>
  );
}
