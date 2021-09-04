import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      items: [],
      categories: [],
    };
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setUniqueCategories(state, data) {
      data.forEach((product) => {
        if (!state.categories.includes(product.category)) {
          state.categories.push(product.category);
        }
      });
    },
  },
  getters: {
    getItems: (state) => state.items,
    getCategories: (state) => state.categories,
  },
});
export default store;
