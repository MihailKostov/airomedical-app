import { create } from 'zustand';

function mergeArrays(array1, array2) {
  const mergedArray = [...array1];

  for (const obj2 of array2) {
    const isDuplicate = mergedArray.some((obj1) => obj1.id === obj2.id);

    if (!isDuplicate) {
      mergedArray.push(obj2);
    }
  }

  return mergedArray;
}

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  selectedRecipes: [],
  visibleRecipes: 15,
  updateRecipes: async (num) => {
    try {
      const response = await fetch(`https://api.punkapi.com/v2/beers?page=${num}`);
      const data = await response.json();
      let updatedData;

      if (![...get().recipes].length) {
        updatedData = data;
      } 
      if (![...data].length) {
        updatedData = [...get().recipes];
      } else {
        updatedData = mergeArrays([...get().recipes], [...data]);
      }

      set({recipes: updatedData})
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  },
  updateVisibleRecipes: () => {
    set({visibleRecipes: get().visibleRecipes += 5});
    return get().visibleRecipes;
  },
  toggleRecipes: (recipe) => {
    set((state) => {
      const isSelected = state.selectedRecipes.includes(recipe);
      const updatedSelectedRecipes = isSelected
        ? state.selectedRecipes.filter((el) => el !== recipe)
        : [...state.selectedRecipes, recipe];
      return { selectedRecipes: updatedSelectedRecipes };
    });
  },
  deleteSelectedRecipes: () => {
    set((state) => ({
      recipes: state.recipes.filter((recipe) =>
        state.selectedRecipes.every((selected) => selected.id !== recipe.id)
      ),
      selectedRecipes: [],
    }));
  },
}));

