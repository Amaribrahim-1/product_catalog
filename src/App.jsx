import { useState } from "react";
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
