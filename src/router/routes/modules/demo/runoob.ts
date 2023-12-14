import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const permission: AppRouteModule = {
  path: '/runoob',
  name: 'Runoob',
  component: LAYOUT,
  redirect: '/runoob/menu1/menu1-1/menu1-1-1',
  meta: {
    orderNo: 2000,
    icon: 'ion:menu-outline',
    title: t('routes.runoob.runoob.runoob'),
  },

  children: [
    {
      path: 'menu1',
      name: 'Menu1Demo',
      component: getParentLayout('Menu1Demo'),
      meta: {
        title: 'Menu1',
      },
      redirect: '/runoob/menu1/menu1-1/menu1-1-1',
      children: [
        {
          path: 'menu1-1',
          name: 'Menu11Demo',
          component: getParentLayout('Menu11Demo'),
          meta: {
            title: 'Menu1-1',
          },
          redirect: '/level/menu1/menu1-1/menu1-1-1',
          children: [
            {
              path: 'menu1-1-1',
              name: 'Menu111Demo',
              component: () => import('/@/views/demo/runoob/Menu111.vue'),
              meta: {
                title: 'Menu111',
              },
            },
          ],
        },
        {
          path: 'menu1-2',
          name: 'Menu12Demo',
          component: () => import('/@/views/demo/runoob/Menu12.vue'),
          meta: {
            title: 'Menu1-2',
          },
        },
      ],
    },
    {
      path: 'menu2',
      name: 'Menu2Demo',
      component: () => import('/@/views/demo/runoob/Menu2.vue'),
      meta: {
        title: 'Menu2',
        // ignoreKeepAlive: true,
      },
    },
    {
      path: 'DemoFirst',
      name: 'DemoFirst',
      component: () => import('/@/views/demo/runoob/DemoFirst.vue'),
      meta: {
        title: 'routes.runoob.runoob.DemoFirst',
        // ignoreKeepAlive: true,
      },
    },
    {
      path: 'Vue3_start',
      name: 'Vue3_start',
      component: getParentLayout('Vue3_start'),
      meta: {
        title: 'Vue3_start',
      },
      redirect: '/runoob/Vue3_start/menu1-1/menu1-1-1',
      children: [
        {
          path: 'menu1-1',
          name: 'Menu11Demo',
          component: getParentLayout('Menu11Demo'),
          meta: {
            title: 'Menu1-1',
          },
          redirect: '/level/menu1/menu1-1/menu1-1-1',
          children: [
            {
              path: 'menu1-1-1',
              name: 'Menu111Demo',
              component: () => import('/@/views/demo/runoob/Menu111.vue'),
              meta: {
                title: 'Menu111',
              },
            },
          ],
        },
        {
          path: 'createApp',
          name: 'createApp',
          component: () => import('/@/views/demo/runoob/createApp.vue'),
          meta: {
            title: 'createApp',
          },
        },
        {
          path: 'FunctionData',
          name: 'FunctionData',
          component: () => import('/@/views/demo/runoob/FunctionData.vue'),
          meta: {
            title: 'FunctionData',
          },
        },
        {
          path: 'FunctionMethods',
          name: 'FunctionMethods',
          component: () => import('/@/views/demo/runoob/FunctionMethods.vue'),
          meta: {
            title: 'FunctionMethods',
          },
        },
      ],
    },
  ],
};

export default permission;
