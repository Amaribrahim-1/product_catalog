export default function PageTitle({ productCount }) {
  return (
    <div className="page-title-section">
      <h2 className="page-title">Discover Products</h2>
      <p className="products-count">Found {productCount} products</p>
    </div>
  );
}
