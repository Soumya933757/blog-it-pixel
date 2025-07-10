import React, { useEffect, useState } from "react";

import categoriesApi from "../../apis/categories";

const Category = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex w-2/6 flex-col items-center gap-4 bg-gray-200 py-5 shadow-md md:w-1/6">
      {categories?.map(category => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );
};

export default Category;
