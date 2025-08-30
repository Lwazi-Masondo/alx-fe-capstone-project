import SearchForPlan from "./SearchForPlan";
import RecipeResultsPlan from "./RecipeResultsPlan";
import useSearchStore from "../store/searchStore";
import { useParams } from "react-router-dom";

function Plan() {
  return (
    <div>
      <div>
        <SearchForPlan />
      </div>
      {/* Display */}
      <div className="border-2 border-b-orange-500">
        <p className="text-2xl text-orange-500 mt-10 text-center">Plans</p>
      </div>
    </div>
  );
}

export default Plan;
