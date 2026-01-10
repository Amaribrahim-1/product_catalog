import { useEffect, useState } from "react";
import "./styles.css";

import useProducts from "./components/useProducts";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Main from "./components/Main";
import PageTitle from "./components/PageTitle";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Search from "./components/Search";
import Filter from "./components/Filter";
import useNotification from "./components/useNotification";
import Notification from "./components/Notification";
import Modal from "./Modal";

export default function App() {
  const [category, setCategory] = useState("all");
  const { products, isLoading, error } = useProducts(category);
  const [query, setQuery] = useState("");

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState(
    () => JSON.parse(localStorage.getItem("cartProducts")) || []
  );

  const { notification, showNotification, hideNotification } =
    useNotification(2500);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

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
    showNotification({ type: "success", message: "Product added to cart" });
  }

  function handleRemoveRequest(id) {
    setPendingDeleteId(id);
    setIsModalOpen(true);
  }

  function handleConfirmDelete() {
    setCartProducts((cartProducts) =>
      cartProducts.filter((cartProduct) => cartProduct.id !== pendingDeleteId)
    );

    setIsModalOpen(false);
    setPendingDeleteId(null);

    showNotification({
      type: "info",
      message: "Item removed from cart",
    });
  }

  function handleCancelDelete() {
    setIsModalOpen(false);
    setPendingDeleteId(null);
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

  useEffect(() => {
    if (cartProducts.length === 0) {
      localStorage.removeItem("cartProducts");
    } else {
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  const displayedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="app-container">
      <NavBar setIsCartOpen={setIsCartOpen} cartProducts={cartProducts}>
        <Search query={query} setQuery={setQuery} />
        <Filter category={category} setCategory={setCategory} />
      </NavBar>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <Main>
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={hideNotification}
            />
          )}
          {isModalOpen && (
            <Modal
              title="Remove item?"
              message="Are you sure you want to remove this item?"
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}

          <PageTitle productCount={displayedProducts.length} />
          <Products
            products={displayedProducts}
            onAddToCart={handleAddToCart}
          />
          {isCartOpen && (
            <Cart
              cartProducts={cartProducts}
              setIsCartOpen={setIsCartOpen}
              onRemoveItem={handleRemoveRequest}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          )}
        </Main>
      )}
    </div>
  );
}
