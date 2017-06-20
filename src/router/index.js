import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Posts from '@/components/posts/Posts'
import Blog from '@/components/blog/Blog'
import About from '@/components/about/About'
import Admin from '@/components/admin/Admin'
import Login from '@/components/admin/login/Login'
import Reg from '@/components/admin/reg/Reg'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home
    },
    {
      path: '/posts/',
      name: 'Blogs',
      component: Posts
    },
    {
      path: '/blog/:index',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/about/',
      name: 'About',
      component: About
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'reg',
          name: 'Register',
          component: Reg
        }
      ]
    }
  ]
})
