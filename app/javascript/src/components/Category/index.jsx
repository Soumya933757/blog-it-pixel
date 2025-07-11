import React, { useEffect, useState } from "react";

import { Plus, Search } from "@bigbinary/neeto-icons";
import { Modal, Typography } from "@bigbinary/neetoui";
import classnames from "classnames";
import { isEmpty } from "ramda";

import categoriesApi from "../../apis/categories";
import useDebounce from "../../hooks/useDebounce";
import useCategoryItemStore from "../../stores/useCategoryItemStore";
import { Button, Input } from "../commons";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [showInputBar, setShowInputBar] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { selectedCategories, toggleCategory } = useCategoryItemStore();

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

  const createCategory = async () => {
    try {
      await categoriesApi.create({ category: { name: categoryTitle } });
      fetchCategories();
      setShowCreateCategoryModal(false);
    } catch (error) {
      logger.error(error);
    }
  };
  const debouncedSearchValue = useDebounce(searchValue);

  const searchedCategories = !isEmpty(debouncedSearchValue)
    ? categories.filter(category =>
        category.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())
      )
    : categories;

  return (
    <div className="flex w-3/6 flex-col items-center gap-4 bg-gray-200 px-4 py-5 shadow-md md:w-3/12">
      <div className="flex w-full items-center justify-between">
        <Typography style="h4">CATEGORIES</Typography>
        <div className="flex">
          <Search color="gray" onClick={() => setShowInputBar(prev => !prev)} />
          <Plus
            color="gray"
            onClick={() => setShowCreateCategoryModal(prev => !prev)}
          />
        </div>
      </div>
      <div className="w-full">
        {showInputBar && (
          <Input
            placeholder="Search Categories..."
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
          />
        )}
      </div>
      <div className="flex w-full flex-col gap-4">
        {searchedCategories?.map(category => (
          <div
            key={category.id}
            className={classnames(
              "w-full cursor-pointer border border-gray-300 px-3 py-1",
              { "bg-white": selectedCategories.includes(category.id) }
            )}
            onClick={() => toggleCategory(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
      <Modal
        closeButton
        closeOnOutsideClick
        className="card flex flex-col justify-evenly gap-4 rounded-md bg-white px-4 py-5 shadow-lg"
        isOpen={showCreateCategoryModal}
        size="small"
        onClose={() => setShowCreateCategoryModal(false)}
      >
        <Typography style="h2">New category</Typography>
        <Input
          label="Category title"
          placeholder="Enter title"
          value={categoryTitle}
          onChange={event => setCategoryTitle(event.target.value)}
        />
        <div className="flex gap-4 ">
          <Button buttonText="Add" onClick={createCategory} />
          <Button
            buttonText="Cancel"
            style="secondary"
            onClick={() => setShowCreateCategoryModal(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Category;
