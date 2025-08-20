import React from "react";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  subCategories?: Category[];
}

interface CategorySidebarProps {
  categories: Category[];
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories }) => {
  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <h3 className="font-bold mb-3">Department</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`} className="text-sm hover:text-[#FF9900]">
              {category.name}
            </Link>
            {category.subCategories && category.subCategories.length > 0 && (
              <ul className="ml-4 mt-1 space-y-1">
                {category.subCategories.map((subCategory) => (
                  <li key={subCategory.id}>
                    <Link
                      to={`/category/${category.id}/${subCategory.id}`}
                      className="text-xs text-gray-600 hover:text-[#FF9900]"
                    >
                      {subCategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <h3 className="font-bold mb-3">Customer Review</h3>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((stars) => (
            <Link key={stars} to={`/search?rating=${stars}`} className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < stars ? "text-[#FFA41C]" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-600 ml-1">& Up</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-3">Price</h3>
        <ul className="space-y-1">
          <li>
            <Link to="/search?price=under-25" className="text-sm hover:text-[#FF9900]">
              Under R25
            </Link>
          </li>
          <li>
            <Link to="/search?price=25-50" className="text-sm hover:text-[#FF9900]">
              R25 to R50
            </Link>
          </li>
          <li>
            <Link to="/search?price=50-100" className="text-sm hover:text-[#FF9900]">
              R50 to R100
            </Link>
          </li>
          <li>
            <Link to="/search?price=100-200" className="text-sm hover:text-[#FF9900]">
              R100 to R200
            </Link>
          </li>
          <li>
            <Link to="/search?price=over-200" className="text-sm hover:text-[#FF9900]">
              R200 & Above
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategorySidebar;
