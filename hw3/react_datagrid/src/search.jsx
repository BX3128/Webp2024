export default function Search() {
  return (
    <input
      id="search"
      type="text"
      placeholder="請輸入關鍵字"
      value={internalSearchTerm} // Use internal state for value
      onChange={handleSearchChange}
    />
  );
}