import { storeModuleFactory } from "./factory/factory";

// Create and export stores based on storeModuleFactory
export const bookStore = storeModuleFactory("books");

// Example how to add another function to the bookStore, might be buggy as it is not tested
bookStore.actions.getByCategoryId = async (categoryId) => {
    const { data } = await axios.get(`books/${categoryId}/category`);
    if (!data) return;
    bookStore.setters.setAll(data);
};
