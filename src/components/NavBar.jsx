import Logo from "./Logo";
import Button from "./Button";

export default function NavBar({ children, setIsCartOpen, cartProducts }) {
  const cartCount = cartProducts.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-top">
          <Logo />
          <Button
            className="cart-button"
            onClick={() => setIsCartOpen((isOpen) => !isOpen)}
          >
            🛒 Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Button>
        </div>
        <div className="search-filter-section">{children}</div>
      </div>
    </header>
  );
}
