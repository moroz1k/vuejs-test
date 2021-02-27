import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

import getPaymentsMock from '@/mocks/getPayments';
import { getCache, clearCache as clearCacheUtil } from '@/utils';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    data: [],
    isLoading: false,
    isCached: false,
  }),

  mutations: {
    set(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          Vue.set(state, key, { ...state[key], ...data });
        } else {
          Vue.set(state, key, data);
        }
      });
    },
  },

  actions: {
    async load({ commit }, params = {}) {
      commit('set', { isLoading: true });

      const cache = getCache();

      if (cache) {
        commit('set', { isCached: true, data: cache, isLoading: false });
        return;
      }

      const isDevelopment = process.env.NODE_ENV === 'development';
      const resource = isDevelopment ? getPaymentsMock : api.getPayments;

      try {
        const { data } = await resource(params);

        if (Array.isArray(data)) {
          commit('set', { data });
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('set', { isLoading: false });
      }
    },
    clearCache({ commit, dispatch }) {
      clearCacheUtil();

      commit('set', { isCached: false });

      dispatch('load');
    },
  },
});
