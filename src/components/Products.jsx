import Product from "./Product";

export default function Products({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h3 className="empty-title">No products found</h3>
        <p className="empty-description">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <ul className="products-grid">
      {products.map((product) => (
        <Product product={product} key={product.id} onAddToCart={onAddToCart} />
      ))}
    </ul>
  );
}
