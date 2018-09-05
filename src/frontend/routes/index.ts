import Vue from 'vue'
import VueRouter from 'vue-router'

import guards from './guards'

import Viewport from '../components/_Viewport.vue'
import LogIn from '../pages/LogIn.vue'
import Front from '../pages/Front.vue'
import SignUp from '../pages/SignUp.vue'
import Verify from '../pages/Verify.vue'

import NewsList from '../pages/News/List.vue'
import NewsArticle from '../pages/News/Article.vue'

import ForumIndex from '../pages/Forum/Index.vue'
import ForumCategory from '../pages/Forum/Category.vue'
import ForumThread from '../pages/Forum/Thread.vue'

import UserProfile from '../pages/UserProfile.vue'

import Admin from '../components/Admin/_Viewport.vue'
import AdminDashboard from '../pages/Admin/Dashboard.vue'
import AdminUsersIndex from '../pages/Admin/Users/Index.vue'
import AdminNewsIndex from '../pages/Admin/News/Index.vue'
import AdminNewsEdit from '../pages/Admin/News/Edit.vue'

import Contact from '../pages/Contact.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Viewport,
    children: [
      { path: '/', component: Front },
      { path: '/news', component: NewsList },
      { path: '/news/:id-:slug', name: 'news-article', component: NewsArticle },
      { path: '/news/category/:id-:slug', name: 'news-category', component: NewsList },
      { path: '/forum', component: ForumIndex },
      { path: '/forum/category/:id-:slug', name: 'forum-category', component: ForumCategory },
      { path: '/forum/thread/:id-:slug', name: 'forum-thread', component: ForumThread },
      { path: '/user/login', component: LogIn },
      { path: '/user/signup', component: SignUp },
      { path: '/user/verify/:code', component: Verify },
      { path: '/user/:name', name: 'user-profile', component: UserProfile },
      { path: '/contact', component: Contact }
    ]
  },
  {
    path: '/admin',
    beforeEnter: guards.isAuthenticated,
    component: Admin,
    children: [
      { path: '/', component: AdminDashboard },
      { path: 'users', component: AdminUsersIndex },
      { path: 'news', component: AdminNewsIndex },
      { path: 'news/create', component: AdminNewsEdit },
      { path: 'news/:id', component: AdminNewsEdit }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
