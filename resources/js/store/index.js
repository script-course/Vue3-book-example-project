import { storeModuleFactory } from "./factory/factory";

// Create and export stores based on storeModuleFactory
export const bookStore = storeModuleFactory("book");
