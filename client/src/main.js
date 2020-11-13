import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import LessonView from './components/LessonView'
import MainView from './components/MainView'
import RevisionView from './components/RevisionView'
import './registerServiceWorker'
import VueSwing from 'vue-swing'


Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.component('vue-swing', VueSwing)


const router = new VueRouter({
  routes : [
    { path: '/lesson/:name', name: 'lesson', component: LessonView},
    {path: '/revision/:name', name: 'revision', component: RevisionView},
    {path: '/', name :'home', component: MainView}
  ]
})

new Vue({
  vuetify,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
