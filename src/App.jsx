import { useEffect, useRef, useState } from "react";
import "./styles.css";

function useProducts(category) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError("");

        const url =
          category === "all"
            ? "https://fakestoreapi.com/products?sort=asc"
            : `https://fakestoreapi.com/products/category/${category}`;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to load products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        if (err.name === "AbortError") return;

        if (err.message === "Failed to fetch")
          setError("Network error. Please check your connection.");
        else setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, [category]);
  return { products, isLoading, error };
}

export default function App() {
  const [category, setCategory] = useState("all");
  const { products, isLoading, error } = useProducts(category);
  const [query, setQuery] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  function handleAddToCart(product) {
    setCartProducts((cartProducts) => {
      const existingProduct = cartProducts.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return cartProducts.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...cartProducts, { ...product, quantity: 1 }];
    });
  }

  function hanldeRemoveItem(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((cartProduct) => cartProduct.id !== id)
    );
  }

  function handleIncrease(id) {
    setCartProducts((cartProducts) =>
      cartProducts.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleDecrease(id) {
    setCartProducts((cartProducts) =>
      cartProducts.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  }

  const displayedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="app-container">
      <NavBar setIsOpen={setIsOpen} cartProducts={cartProducts}>
        <Search query={query} setQuery={setQuery} />
        <Filter category={category} setCategory={setCategory} />
      </NavBar>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <Main>
          <PageTitle productCount={displayedProducts.length} />
          <Products
            products={displayedProducts}
            onAddToCart={handleAddToCart}
          />
          {isOpen && (
            <Cart
              cartProducts={cartProducts}
              setIsOpen={setIsOpen}
              onRemoveItem={hanldeRemoveItem}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          )}
        </Main>
      )}
    </div>
  );
}

function Loader() {
  return (
    <div className="loading-container">
      <span className="loading-spinner"></span>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <p className="error-text">{message}</p>
    </div>
  );
}

function NavBar({ children, setIsOpen, cartProducts }) {
  const cartCount = cartProducts.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-top">
          <Logo />
          <Button
            className="cart-button"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
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

function Logo() {
  return (
    <div className="logo-section">
      <span className="logo-icon">S</span>
      <h1 className="logo-text">ShopHub</h1>
    </div>
  );
}

function Button({ className, children, onClick, disabled }) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(() => inputEl.current.focus(), []);

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Filter({ category, setCategory }) {
  return (
    <select
      className="category-select"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="all">All</option>
      <option value="men's clothing">Men</option>
      <option value="women's clothing">Women</option>
      <option value="electronics">Electronics</option>
      <option value="jewelery">Jewelery</option>
    </select>
  );
}

function Cart({
  cartProducts,
  setIsOpen,
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
      <div className="cart-overlay"></div>
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <Button
            className="cart-close-button"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
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

function CartItem({ cartProduct, onIncrease, onDecrease, onRemoveItem }) {
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

function Main({ children }) {
  return <main className="main-content">{children}</main>;
}

function PageTitle({ productCount }) {
  return (
    <div className="page-title-section">
      <h2 className="page-title">Discover Products</h2>
      <p className="products-count">Found {productCount} products</p>
    </div>
  );
}

function Products({ products, onAddToCart }) {
  return (
    <ul className="products-grid">
      {products.map((product) => (
        <Product product={product} key={product.id} onAddToCart={onAddToCart} />
      ))}
    </ul>
  );
}

function Product({ product, onAddToCart }) {
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

function Stars({ filled }) {
  return (
    <span className="rating-stars">
      {Array.from({ length: 5 }, (_, i) =>
        i < filled ? <span key={i}>★</span> : <span key={i}>☆</span>
      )}
    </span>
  );
}
