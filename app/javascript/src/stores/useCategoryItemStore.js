import { create } from "zustand";

const useCategoryItemStore = create(set => ({
  selectedCategories: [],

  toggleCategory: category =>
    set(state => {
      if (state.selectedCategories.includes(category)) {
        return {
          selectedCategories: state.selectedCategories.filter(
            item => item !== category
          ),
        };
      }

      return { selectedCategories: [...state.selectedCategories, category] };
    }),
}));

export default useCategoryItemStore;
