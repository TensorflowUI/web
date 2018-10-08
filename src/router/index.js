import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Api from '@/views/api'
import Docs from '@/views/docs'
import Example from '@/views/example'
import ImageClassification from '@/views/new/imageClassification'
import Sketch from '@/views/new/sketch'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/api',
      name: 'Api',
      component: Api
    },
    {
      path: '/docs',
      name: 'Docs',
      component: Docs
    },
    {
      path: '/example',
      name: 'Example',
      component: Example
    },
    {
      path: '/new/imageClassification',
      name: 'imageClassification',
      component: ImageClassification
    },
    {
      path: '/new/sketch',
      name: 'sketch',
      component: Sketch
    }
  ]
})
