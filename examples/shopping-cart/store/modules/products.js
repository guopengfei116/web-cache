import products from '../../api/products';

// initial state
const state = {
  all: [],
  totalPage: 1,
};

// getters
const getters = {
  
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products;
  },
  setTotalPage(state, totalPage) {
    state.totalPage = totalPage;
  },
};

// actions
const actions = {
  getProducts({ commit }, payload) {
    products.getProducts(payload).then(({products, totalPage}) => {
      commit('setProducts', products);
      commit('setTotalPage', totalPage);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
