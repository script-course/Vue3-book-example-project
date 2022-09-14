import { computed, ref } from "vue";
import axios from "axios";
interface State<T extends { id: number }> {
    [id: number]: T | undefined;
}
/**
 * Omit's the id from item
 * Being used when items are being created, because they don't have an id yet
 */
type New<T extends { id: number }> = Omit<T, "id">;
/**
 * Makes the id for the given item optional
 * Forms use this generic type, because the given item can either be created or updated
 */
type Updatable<T extends { id: number }> = New<T> & {
    id?: number;
};
/**
 * Creates a store module for the given module name.
 */
export const storeModuleFactory = <T extends { id: number }>(
    moduleName: string
) => {
    const state = ref<State<T>>({});
    const getters = {
        /** Get all items from the store */
        all: computed(() => Object.values(state.value)),
        /**
         * Get an item from the state by id
         */
        byId: (id: number) => computed(() => state.value[id]),
    };
    const setters = {
        /**
         * Set items in the state.
         */
        setAll: (items: T[]) => {
            for (const item of items)
                state.value[item.id] = Object.freeze(item);
        },
        /**
         * Set one specific item in the storage
         */
        setById: (item: T) => {
            state.value[item.id] = Object.freeze(item);
        },
        /**
         * Delete one specific item in the storage by id
         */
        deleteById: (id: number) => {
            delete state.value[id];
        },
    };
    const actions = {
        getAll: async () => {
            const { data } = await axios.get(moduleName);
            if (!data) return;
            setters.setAll(data);
        },
        getById: async (id: number) => {
            const { data } = await axios.get(`${moduleName}/${id}`);
            if (!data) return;
            setters.setById(data);
        },
        create: async (newItem: New<T>) => {
            const { data } = await axios.post(moduleName, newItem);
            if (!data) return;
            setters.setById(data);
        },
        update: async (id: number, item: Updatable<T>) => {
            const { data } = await axios.post(`${moduleName}/${id}`, item);
            if (!data) return;
            setters.setById(data);
        },
        delete: async (id: number) => {
            await axios.delete(`${moduleName}/${id}`);
            setters.deleteById(id);
        },
    };
    return {
        ...getters,
        ...setters,
        ...actions,
    };
};
