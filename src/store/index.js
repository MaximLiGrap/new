import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myLat: null,
    myLon: null,
    citys: [],
    errorMessage: '',
    citysId: [],
  },
  getters: {
  },
  mutations: {
    addCity(state, item) {
      if (state.citys.find((i) => i.id === item.id) === undefined) {
        state.citys.push(item);
        state.errorMessage = '';
      }
    },
    addCityId(state, item) {
      if (!state.citysId.includes(item.id)) {
        state.citysId.push(item.id);
        localStorage.setItem('citysId', JSON.stringify(state.citysId));
      }
    },
    updatecityId(state, citysId) {
      state.citysId = citysId;
    },
    deleteCity(state, id) {
      state.citys = state.citys.filter((item) => item.id !== id);
      state.citysId = state.citysId.filter((item) => item !== id);
      localStorage.setItem('citysId', JSON.stringify(state.citysId));
    },
    loadError(state, mes) {
      state.errorMessage = mes;
    },
    updateList(state, value) {
      state.citys = value;
    },
  },
  actions: {
    loadWether(context, { lat, lon }) {
      return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dcc80dd6679892be3cff7b98e573b28b`, {
        params: {
          units: 'metric',
        },
      })
        .then((response) => {
          context.commit('addCity', response.data);
        }).catch((error) => {
          context.commit('loadError', error.response.data.message);
        });
    },
    loadCity(context, city) {
      return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dcc80dd6679892be3cff7b98e573b28b`, {
        params: {
          units: 'metric',
        },
      })
        .then((response) => {
          context.commit('addCity', response.data);
          context.commit('addCityId', response.data);
        }).catch((error) => {
          context.commit('loadError', error.response.data.message);
        });
    },
    loadMemmoryCity(context, cityId) {
      return axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=dcc80dd6679892be3cff7b98e573b28b`, {
        params: {
          units: 'metric',
        },
      })
        .then((response) => {
          context.commit('addCity', response.data);
        }).catch((error) => {
          context.commit('loadError', error.response.data.message);
        });
    },
  },
  modules: {
  },
});
