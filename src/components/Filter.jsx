export default function Filter({ category, setCategory }) {
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
