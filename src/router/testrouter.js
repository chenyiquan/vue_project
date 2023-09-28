import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

// Import your Vue components
import Home from './components/Home.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';

Vue.use(VueRouter);

// Define your routes
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact }
];

// Create the Vue Router instance
const router = new VueRouter({
  routes
});

// Create the Vue instance with the router
new Vue({
  render: (h) => h(App),
  router // Add the router to the Vue instance
}).$mount('#app');