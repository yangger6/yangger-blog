import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Posts from '@/components/posts/Posts'
import Blog from '@/components/blog/Blog'
import About from '@/components/about/About'
import Admin from '@/components/admin/Admin'
import Login from '@/components/admin/login/Login'
import Reg from '@/components/admin/reg/Reg'
import Editor from '@/components/admin/editor/editor'
import Log from '@/components/admin/log/log'

Vue.use(Router)
export default new Router({
  mode: 'history',
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
      path: '/blog/:blogId',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/about/',
      name: 'About',
      component: About
    },
    {
      path: '/admin/',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: '/admin/editor/',
          name: 'Editor',
          component: Editor
        },
        {
          path: 'admin/log',
          name: 'Log',
          component: Log
        }
      ]
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg/',
      name: 'Register',
      component: Reg
    }
  ]
})
