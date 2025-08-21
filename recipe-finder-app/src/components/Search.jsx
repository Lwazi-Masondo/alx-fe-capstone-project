import useSearchStore from "../store/searchStore";

function Search({ onSubmit }) {
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery); //selectors prevent unnecessary rendering and better that the other method.

  const handleSubmit = (e) => {
    e.preventDefault(); //prevents page from reloading;
    onSubmit?.(query.trim()); // passes the current query to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="bg-amber-50">
      <input
        type="text"
        placeholder="Search Recipe.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="inputField"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
