import { useEffect, useState } from "react";
import useSearchStore from "../store/searchStore";

function FilterFoods() {
  const categories = useSearchStore((s) => s.categories);
  const filterByCategory = useSearchStore((s) => s.filterByCategory);
  const loadCategories = useSearchStore((s) => s.loadCategories);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadCategories(); //fetch components when component mounts
  }, [loadCategories]);

  return (
    <div className="bg-none flex flex-col justify-center text-center">
      <label className="bg-black text-lime-200">Filter by Category:</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-lime-200 py-2 px-2 rounded hover:bg-orange-500 w-40 self-center"
      >
        Categories
      </button>{" "}
      {isOpen && (
        <ul className="w-40 m-auto">
          {categories.map((cat) => (
            <li
              key={cat.strCategory}
              onClick={() => {
                filterByCategory(cat.strCategory);
                setIsOpen(false);
              }}
              className="hover:bg-orange-500 cursor-pointer text-center text-lime-200 m-auto"
            >
              {cat.strCategory}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterFoods;
