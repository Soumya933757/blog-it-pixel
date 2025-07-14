import React from "react";

import { Input } from "components/commons";
import Select from "react-select";

import { useFetchCategories } from "../../hooks/reactQuery/categoriesApi";

const Form = ({
  title,
  setTitle,
  setDescription,
  description,
  category,
  setCategory,
}) => {
  const { data } = useFetchCategories();
  const categories = data?.categories || [];

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  const selectedOptions = categoryOptions.filter(option =>
    category.includes(option.value)
  );

  const handleCategoryChange = selectedOptions => {
    const ids = selectedOptions.map(option => option.value);
    setCategory(ids);
  };

  return (
    <form className="mb-4 flex h-3/4 w-full flex-col justify-between rounded-md border p-5 shadow-md">
      <div className="flex flex-col gap-6">
        <Input
          label="Title"
          placeholder="Enter title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-800">
            Categories
          </label>
          <Select
            isMulti
            className="text-sm"
            classNamePrefix="react-select"
            options={categoryOptions}
            value={selectedOptions}
            onChange={handleCategoryChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter description"
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
