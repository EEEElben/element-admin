import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home.vue');
const index = () => import('../views/mainCon/index.vue');

const articleMgt = () => import('../views/mainCon/contentMgt/articleMgt.vue');
const classifyMgt = () => import('../views/mainCon/contentMgt/classifyMgt.vue');

const advertList = () => import('../views/mainCon/advertising/advertList.vue');
const advertTYPE = () => import('../views/mainCon/advertising/advertType.vue');

const login = () => import('../views/mainCon/systemMgt/login.vue');
const adminList = () => import('../views/mainCon/systemMgt/adminList.vue');
const abnormal = () => import('../views/mainCon/systemMgt/abnormal.vue');
const roleMgt = () => import('../views/mainCon/systemMgt/roleMgt.vue');
const authorityMgt = () => import('../views/mainCon/systemMgt/authorityMgt.vue');
const menuMgt = () => import('../views/mainCon/systemMgt/menuMgt.vue');
const globalMgt = () => import('../views/mainCon/systemMgt/globalMgt.vue');
const websiteMgt = () => import('../views/mainCon/systemMgt/websiteMgt.vue');

Vue.use(VueRouter)

const originalReplace = VueRouter.prototype.push;
VueRouter.prototype.push = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

const routes = [{
    path: "",
    redirect: "/home/index"
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
        path: 'index',
        name: 'index',
        component: index,
      },
      {
        path: 'articleMgt',
        name: 'articleMgt',
        component: articleMgt,
      },
      {
        path: 'classifyMgt',
        name: 'classifyMgt',
        component: classifyMgt,
      },
      {
        path: 'advertList',
        name: 'advertList',
        component: advertList,
      },
      {
        path: 'advertTYPE',
        name: 'advertTYPE',
        component: advertTYPE,
      },
      {
        path: 'login',
        name: 'login',
        component: login,
      },
      {
        path: 'adminList',
        name: 'adminList',
        component: adminList,
      },
      {
        path: 'abnormal',
        name: 'abnormal',
        component: abnormal,
      },

      {
        path: 'roleMgt',
        name: 'roleMgt',
        component: roleMgt,
      },
      {
        path: 'authorityMgt',
        name: 'authorityMgt',
        component: authorityMgt,
      },
      {
        path: 'menuMgt',
        name: 'menuMgt',
        component: menuMgt,
      },
      {
        path: 'globalMgt',
        name: 'globalMgt',
        component: globalMgt,
      },
      {
        path: 'websiteMgt',
        name: 'websiteMgt',
        component: websiteMgt,
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router