import Product from "./Product";

export default function Products({ products, onAddToCart }) {
  return (
    <ul className="products-grid">
      {products.map((product) => (
        <Product product={product} key={product.id} onAddToCart={onAddToCart} />
      ))}
    </ul>
  );
}
