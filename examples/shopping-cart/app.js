import '@babel/polyfill';
import Vue from 'vue';
import App from './components/App';
import store from './store';
import 'normalize.css';

new Vue({
  el: '#app',
  store,
  render: c => c(App),
});
