import { computed, ref } from "vue";
import axios from "axios";

/**
 * Creates a store module for the given module name.
 */
export const storeModuleFactory = (moduleName) => {
    const state = ref({});
    const getters = {
        /** Get all items from the store */
        getAll: computed(() => Object.values(state.value)),
        /**
         * Get an item from the state by id
         */
        byId: (id) => computed(() => state.value[id]),
    };
    const setters = {
        /**
         * Set items in the state.
         */
        setAll: (items) => {
            for (const item of items)
                state.value[item.id] = Object.freeze(item);
        },
        /**
         * Set one specific item in the storage
         */
        setById: (item) => {
            state.value[item.id] = Object.freeze(item);
        },
        /**
         * Delete one specific item in the storage by id
         */
        deleteById: (id) => {
            delete state.value[id];
        },
    };
    const actions = {
        getAll: async () => {
            const { data } = await axios.get(moduleName);
            if (!data) return;
            setters.setAll(data);
        },
        getById: async (id) => {
            const { data } = await axios.get(`${moduleName}/${id}`);
            if (!data) return;
            setters.setById(data);
        },
        create: async (newItem) => {
            const { data } = await axios.post(moduleName, newItem);
            if (!data) return;
            setters.setById(data);
        },
        update: async (id, item) => {
            const { data } = await axios.post(`${moduleName}/${id}`, item);
            if (!data) return;
            setters.setById(data);
        },
        delete: async (id) => {
            await axios.delete(`${moduleName}/${id}`);
            setters.deleteById(id);
        },
    };
    return {
        getters,
        setters,
        actions,
    };
};
