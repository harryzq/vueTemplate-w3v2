import Vue from 'vue';
import Router from 'vue-router';
import layout from '../pages/layout'
import cover from '../pages/cover';
import draw from '../pages/draw';
import sales from '../pages/sales';
Vue.use(Router);
const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [{
      path: '/',
      component: layout,
      redirect:'/cover',
      meta: {
        index: '1'
      },
      children: [{
          path: '/cover',
          component: cover,
          meta: {
            index: '1-1'
          },
        },
        {
          path: '/draw',
          component: draw,
          meta: {
            index: '1-2'
          },
        }, {
          path: '/sales',
          component: sales,
          meta: {
            index: '1-3'
          },
        },
      ]
    }
    // {
    //   path: '/news',
    //   name:'NEWS',
    //   components: {
    //     activity:news,
    //   },
    //   meta:{
    //     index:3
    //   }
    // },
    // {
    //   path: '/detail',
    //   name:'DETAIL',
    //   components: {
    //     activity:detail,
    //   },
    //   meta:{
    //     index:'3-1',
    //   }
    // }
  ],
});
// 判断是否需要进入首页
router.beforeEach((to, from, next) => {
  next()
  // let hasCame = true
  // if(hasCame){
  //   next()
  // }else{
  //   if(to.path==='/'){
  //     next()
  //   }else{
  //     next({
  //       path: '/'
  //     })
  //   }
  // }
})
export default router