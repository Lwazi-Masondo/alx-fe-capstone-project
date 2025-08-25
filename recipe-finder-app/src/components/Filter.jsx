import { useEffect, useState } from "react";
import useSearchStore from "../store/searchStore";

function Filter() {
  const categories = useSearchStore((s) => s.categories);
  const loadCategories = useSearchStore((s) => s.loadCategories);
  const filterByCategory = useSearchStore((s) => s.filterByCategory);

  useEffect(() => {
    loadCategories(); //fetch components when component mounts
  }, [loadCategories]);

  return (
    <div>
      <label>Filter by Category:</label>
      <select onChange={(e) => filterByCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.strCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
